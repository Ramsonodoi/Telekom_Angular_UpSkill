import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  getFormControl(form: FormGroup, controlName: string): FormControl {
    return form.get(controlName) as FormControl
  }

  constructor() { }
}
