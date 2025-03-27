import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toastalert',
  imports: [],
  templateUrl: './toastalert.component.html',
  styleUrl: './toastalert.component.scss',
})
export class ToastalertComponent {
  constructor(private toastr: ToastrService) {}

  CreateSuccess() {
    this.toastr.success('Livre creer avec succes', 'Success',{closeButton:true, positionClass:'toast-center-center'});
  }

  CreateError() {
    this.toastr.error('Oups, une erreur c est produite', 'Failed',{closeButton:true, positionClass:'toast-center-center'});
  }

  ModifySuccess() {
    this.toastr.success('Livre modifier avec succes', 'Success',{closeButton:true, positionClass:'toast-center-center'});
  }

  ModifyError() {
    this.toastr.error('Oups, une erreur c est produite', 'Failed',{closeButton:true, positionClass:'toast-center-center'});
  }

}
