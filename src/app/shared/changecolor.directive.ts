import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appChangecolor]',
  standalone: true
})
export class ChangecolorDirective {
   defaultColor = 'green'

   @Input('appChangecolor') companyName: string = ''
  constructor(private el: ElementRef) { 
  }

  ngOnChanges() {
    this.el.nativeElement.style.color = this.companyName || this.defaultColor
  }

}
