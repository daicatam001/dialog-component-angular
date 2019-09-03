import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { InsertionDirective } from './insertion.directive';

@NgModule({
  imports: [],
  exports: [InsertionDirective, DialogComponent],
  declarations: [DialogComponent, InsertionDirective],
  entryComponents: [DialogComponent],
  providers: []
})
export class DialogModule {}
