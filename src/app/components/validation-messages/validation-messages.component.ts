import { Component, Input } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-validation-messages',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './validation-messages.component.html',
  styleUrl: './validation-messages.component.scss',
})
export class ValidationMessagesComponent {
  @Input() control = new FormControl();
  @Input() errorMap: { [key: string]: string } = {};

  get isInvalid(): boolean {
    return (
      !!this.control &&
      this.control.invalid &&
      (this.control.dirty || this.control.touched)
    );
  }

  get errorMessages(): string[] {
    if (!this.control?.errors) return [];
    return Object.keys(this.control.errors)
      .map((key) => this.errorMap[key])
      .filter((message) => !!message);
  }
}
