import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SectorCreationDto } from '../../model/sector/sector-creation.dto';
import { UserSctrDto } from '../../model/sector/user-sctr-dto';
import { SectorService } from '../../services/sector.service';
import { UserSctrWrapperDto } from '../../model/sector/user-sctr-wrapper-dto';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-sector-dialog',
  templateUrl: './add-sector-dialog.component.html',
  styleUrl: './add-sector-dialog.component.scss'
})
export class AddSectorDialogComponent implements OnInit {

  @Input({ required: true })
  dialogVisibility: boolean = false

  @Output()
  dialogVisibilityChange = new EventEmitter<boolean>()

  @Output()
  onCreateSectorEmmit = new EventEmitter<SectorCreationDto>()

  sectorForm: FormGroup = this._formBuilder.group({
    description: [],
    employees: [],
    customers: []
  })

  customersOptions: UserSctrDto[] = [] as UserSctrDto[]
  employeesOptions: UserSctrDto[] = [] as UserSctrDto[]

  constructor (
    private _formBuilder: FormBuilder,
    private _sectorService: SectorService,
    private _snackBar: MatSnackBar,
  ) {}

  async ngOnInit(): Promise<void> {

    await this.findEmployeesByType()
    await this.findCustomersByType()

    this.sectorForm = this._formBuilder.group({
      description: new FormControl(),
      employees: new FormControl(),
      customers: new FormControl()
    })
  }

  async findEmployeesByType() {
    try {
      const employees$ = this._sectorService.findUsersByType("Employee")
      const wrapper: UserSctrWrapperDto = await firstValueFrom(employees$)
      this.employeesOptions = wrapper.users
    } catch (err) {
      this.showSnackBar('Não foi possível recuperar funcionários. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  async findCustomersByType() {
    try {
      const customers$ = this._sectorService.findUsersByType("Customer")
      const wrapper: UserSctrWrapperDto = await firstValueFrom(customers$)
      this.customersOptions = wrapper.users
    } catch (err) {
      this.showSnackBar('Não foi possível recuperar clientes. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  onCreateSector() {

    const sectorCreationDto: SectorCreationDto = this.sectorForm.value

    this.onCreateSectorEmmit.emit(sectorCreationDto)
  }

  onDialogVisibleChange() {

    this.dialogVisibilityChange.emit(false)
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
