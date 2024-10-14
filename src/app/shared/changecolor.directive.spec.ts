import { Colors } from './../../../node_modules/picocolors/types';
import { ElementRef } from '@angular/core';
import { ChangecolorDirective } from './changecolor.directive';


describe('ChangecolorDirective', () => {

  let directive: ChangecolorDirective

  let mockElementRef: ElementRef

  beforeEach(() => {
    mockElementRef = new ElementRef({
      style: {}
    })
    directive  = new ChangecolorDirective(mockElementRef)
  })


  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });


  it('should set default color to green', () => {
    directive.ngOnChanges()
    expect(mockElementRef.nativeElement.style.color).toBe('green')
  })

  it ('should use default color when input is empty string', () => {
    directive.companyName = ''
    directive.ngOnChanges()
    expect(mockElementRef.nativeElement.style.color).toBe('green')
  })

  it('should update color when input changes', () => {
    directive.companyName = 'red'
    directive.ngOnChanges()
    expect(mockElementRef.nativeElement.style.color).toBe('red')

    directive.companyName = 'yellow'
    directive.ngOnChanges()
    expect(mockElementRef.nativeElement.style.color).toBe('yellow')
  })
});
