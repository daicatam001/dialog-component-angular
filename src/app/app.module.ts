import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExampleComponent } from './example/example.component';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
  declarations: [AppComponent, ExampleComponent],
  imports: [BrowserModule, BrowserAnimationsModule, DialogModule],
  providers: [],
  entryComponents: [ExampleComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
