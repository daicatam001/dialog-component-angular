import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[insertion]' })
export class InsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
