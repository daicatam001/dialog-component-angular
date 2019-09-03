import {
  Injectable,
  ComponentFactoryResolver,
  ComponentRef,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  Type,
  TemplateRef
} from '@angular/core';
import { DialogModule } from './dialog.module';
import { DialogComponent } from './dialog.component';
import { DialogInjector } from './dialog.injector';
import { DialogConfig } from './dialog.config';

@Injectable({
  providedIn: DialogModule
})
export class DialogService {
  dialogComponentRef: ComponentRef<DialogComponent>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}
  appendDialogComponentToBody(config: DialogConfig) {
    const factory = this.resolver.resolveComponentFactory(DialogComponent);
    const mapConfig = new WeakMap();
    mapConfig.set(DialogConfig, config);
    const componentRef = factory.create(
      new DialogInjector(this.injector, mapConfig)
    );
    this.appRef.attachView(componentRef.hostView);
    const domEl = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.append(domEl);
    this.dialogComponentRef = componentRef;
  }
  private removeDialogComponentFromBody() {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
  open(componentType: Type<any> | TemplateRef<any>, config?: DialogConfig) {
    this.appendDialogComponentToBody(config);
    this.dialogComponentRef.instance.childComponentType = componentType;
  }
}
