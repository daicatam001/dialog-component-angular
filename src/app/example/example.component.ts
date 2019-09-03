import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DialogConfig } from '../dialog/dialog.config';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit, AfterViewInit {
  constructor(public config: DialogConfig) {}
  @ViewChild('button', { static: false }) button;
  ngOnInit() {
    console.log(this.button);
  }
  ngAfterViewInit() {
    console.log(this.config);
    console.log(this.button);
  }
  onClose() {}
}
