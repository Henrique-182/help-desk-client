import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FormAction } from '../../../shared/enums/form-action';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SectorService } from '../../services/sector.service';
import { firstValueFrom } from 'rxjs';
import { SectorDto } from '../../model/sector/sector-dto';
import { UserSctrDto } from '../../model/sector/user-sctr-dto';
import { UserSctrWrapperDto } from '../../model/sector/user-sctr-wrapper-dto';

@Component({
  selector: 'app-manage-sector-page',
  templateUrl: './manage-sector-page.component.html',
  styleUrl: './manage-sector-page.component.scss'
})
export class ManageSectorPageComponent implements OnInit {

  id: number = 0
  action: FormAction
  username: string

  breadCrumbItems: MenuItem[] = [
    { label: 'Chat', url: '/chat/home' },
    { label: 'Listagem de Setores', url: '/chat/sectors' }
  ]

  sectorForm: FormGroup = this._formBuilder.group({
    description: [],
    employees: [],
    customers: []
  })
  isFormDisabled: boolean

  customersList: UserSctrDto[] = [] as UserSctrDto[]

  employeesList: UserSctrDto[] = [] as UserSctrDto[]

  sector: SectorDto = {} as SectorDto

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _sectorService: SectorService,
    private _snackBar: MatSnackBar
  ) {
    this.username = localStorage.getItem('username') || 'Usuário'
    this.action = this._router.url.includes('info') ? FormAction.Get : FormAction.Put
    this.isFormDisabled = this.action === FormAction.Get
    this.id = Number.parseInt(this._route.snapshot.paramMap.get('id') || '0')

    this.breadCrumbItems.push(
      this.isFormDisabled ? { label: 'Info', url: `/chat/sector/info/${this.id}` } : { label: 'Edição', url: `/chat/sector/edit/${this.id}` },
      { label: `${this.id}`}
    )
  }

  async ngOnInit() {
    await this.findSectorById()

    if (this.action === FormAction.Put) {
      await this.findEmployeesByType()
      await this.findCustomersByType()
    } else {
      this.employeesList = this.sector.employees
      this.customersList = this.sector.customers
    }

    this.setFormData()
  }

  async findSectorById() {
    try {
      const sector$ = this._sectorService.findById(this.id)
      this.sector = await firstValueFrom(sector$)
    } catch (err) {
      this.showSnackBar('Não foi possível recuperar o setor. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  async findEmployeesByType() {
    try {
      const employees$ = this._sectorService.findUsersByType("Employee")
      const wrapper: UserSctrWrapperDto = await firstValueFrom(employees$)
      this.employeesList = wrapper.users
    } catch (err) {
      this.showSnackBar('Não foi possível recuperar funcionários. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  async findCustomersByType() {
    try {
      const customers$ = this._sectorService.findUsersByType("Customer")
      const wrapper: UserSctrWrapperDto = await firstValueFrom(customers$)
      this.customersList = wrapper.users
    } catch (err) {
      this.showSnackBar('Não foi possível recuperar clientes. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  setFormData() {
    
    this.sectorForm = this._formBuilder.group({
      description: new FormControl({ value: this.sector.description, disabled: this.isFormDisabled }),
      employees: new FormControl<UserSctrDto[] | null>({ value: this.sector.employees, disabled: this.isFormDisabled }),
      customers: new FormControl<UserSctrDto[] | null>({ value: this.sector.customers, disabled: this.isFormDisabled })
    })
  }

  onEdit() {
    this._router.navigate([`chat/sector/edit/${this.sector.key}`])
  }

  onReturn() {
    this._router.navigate(['chat/sectors'])
  }

  async onDelete() {
    try {
      const sector$ = this._sectorService.deleteById(this.sector.key)

      await firstValueFrom(sector$)
      
      this.showSnackBar('Setor excluído com sucesso!', 'Ok!', 3000)

      this._router.navigate(['chat/sectors'])
    } catch (err) {
      this.showSnackBar('Não foi possível excluir o setor. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  async onSave() {
    try {
      const sector = await firstValueFrom(
        this._sectorService
          .updateById(this.sector.key, this.sectorForm.value)
      )

      this.showSnackBar('Setor salvo com sucesso!', 'Ok!', 3000)

      this._router.navigate([`chat/sector/info/${sector.key}`])
    } catch (err) {
      this.showSnackBar('Não foi possível salvar o setor. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }   
  }

  onCancel() {
    this._router.navigate([`chat/sector/info/${this.sector.key}`])
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
