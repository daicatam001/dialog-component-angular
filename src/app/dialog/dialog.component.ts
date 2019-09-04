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
  TemplateRef,
  Input,
  Inject,
  forwardRef,
  ApplicationRef
} from '@angular/core';
import { InsertionDirective } from './insertion.directive';
import { Subject } from 'rxjs';
import { DialogConfig } from './dialog.config';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, AfterViewInit, OnDestroy {
  childComponentRef: ComponentRef<any>;
  childComponentType: Type<any> | TemplateRef<any>;
  @ViewChild(InsertionDirective, { static: true })
  insertionPoint: InsertionDirective;

  afterClosedSubject = new Subject();
  public afterClosed$ = this.afterClosedSubject.asObservable();

  constructor(
    private resolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    public dialogConfig: DialogConfig
  ) {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }
  onOverlayClicked(event: MouseEvent) {
    if (!this.dialogConfig.disabledCloseOnClickOverlay) {
      this.close();
    }
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
      this.childComponentRef = viewContainerRef.createComponent(factory);
    }
  }
  close() {
    this.afterClosedSubject.next();
  }

  ngOnDestroy(): void {
    if (this.childComponentRef) {
      this.childComponentRef.destroy();
    }
  }
}
