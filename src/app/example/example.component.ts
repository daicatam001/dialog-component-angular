import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DialogConfig, DialogData } from '../dialog/dialog.config';
import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit, AfterViewInit {
  constructor(public data: DialogData, private dialogService: DialogService) {
    console.log(data);
  }
  @ViewChild('button', { static: false }) button;
  ngOnInit() {
    console.log(this.button);
  }
  ngAfterViewInit() {
    console.log(this.data);
    console.log(this.button);
  }
  onClose() {
    this.dialogService.close();
  }
}
