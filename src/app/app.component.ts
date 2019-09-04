import {
  Component,
  ViewChild,
  TemplateRef,
  AfterViewInit
} from '@angular/core';
import { ExampleComponent } from './example/example.component';
import { DialogService } from './dialog/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(TemplateRef, { static: false }) template: TemplateRef<any>;
  constructor(public dialog?: DialogService) {}
  ngAfterViewInit() {
    this.dialog.open(ExampleComponent, { disabledCloseButton: true });
  }
  onClick() {
    console.log(1);
  }
}
