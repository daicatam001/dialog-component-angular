import {
  Component,
  OnInit,
  Type,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy,
  ComponentRef,
  ChangeDetectorRef,
  AfterViewInit,
  TemplateRef
} from '@angular/core';
import { InsertionDirective } from './insertion.directive';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { DialogConfig } from './dialog.config';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit, OnDestroy {
  componentRef: ComponentRef<any>;
  childComponentType: Type<any> | TemplateRef<any>;
  @ViewChild(InsertionDirective, { static: true })
  insertionPoint: InsertionDirective;
  constructor(
    private resolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }
  onOverlayClicked(event: MouseEvent) {
    // close the dialog
  }

  onDialogClicked(event: MouseEvent) {
    event.stopPropagation();
  }
  loadChildComponent(contentType: Type<any> | TemplateRef<any>) {
    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();
    if (contentType instanceof TemplateRef) {
      viewContainerRef.createEmbeddedView(contentType);
    } else {
      const factory = this.resolver.resolveComponentFactory(contentType);
      this.componentRef = viewContainerRef.createComponent(factory);
    }
  }
  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
