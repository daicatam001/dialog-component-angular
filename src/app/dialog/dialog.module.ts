import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { InsertionDirective } from './insertion.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [InsertionDirective, DialogComponent],
  declarations: [InsertionDirective, DialogComponent],
  entryComponents: [DialogComponent],
  providers: []
})
export class DialogModule {}
