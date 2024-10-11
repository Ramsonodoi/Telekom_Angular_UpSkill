import { ElementRef } from '@angular/core';
import { ChangecolorDirective } from './changecolor.directive';

describe('ChangecolorDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = new ElementRef(null)
    const directive = new ChangecolorDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
