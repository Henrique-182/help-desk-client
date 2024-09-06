import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserCreationDto } from '../../model/user-creation-dto';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})
export class AddUserDialogComponent implements OnInit {

  @Input({ required: true })
  dialogVisibility: boolean = false

  @Output()
  dialogVisibilityChange = new EventEmitter<boolean>()

  @Output()
  onSaveUserEmitt = new EventEmitter<UserCreationDto>()

  userCreationForm: FormGroup = this._formBuilder.group({
    username: [null],
    fullname: [null],
    type: [null],
    password: [null],
  })

  types = [
    { key: 2, description: "Employee", value: "Funcionário" },
    { key: 3, description: "Customer", value: "Cliente" }
  ]

  constructor(
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.userCreationForm = this._formBuilder.group({
      username: new FormControl(),
      fullname: new FormControl(),
      type: new FormControl(),
      password: new FormControl()
    })
  }

  onSaveUser() {

    const userCreationDto: UserCreationDto = this.userCreationForm.value
    
    this.onSaveUserEmitt.emit(userCreationDto)
  }

  onDialogVisibleChange() {

    this.dialogVisibilityChange.emit(false)
  }

}
