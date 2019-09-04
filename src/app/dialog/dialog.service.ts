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
import { DialogConfig, DialogData } from './dialog.config';

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
  appendDialogComponentToBody(token: WeakMap<any, any>) {
    const factory = this.resolver.resolveComponentFactory(DialogComponent);
    const componentRef = factory.create(
      new DialogInjector(this.injector, token)
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
  open(
    componentType: Type<any> | TemplateRef<any>,
    config?: DialogConfig,
    data?: DialogData
  ) {
    const token = new WeakMap();
    token.set(DialogConfig, config || new DialogConfig());
    token.set(DialogData, data || new DialogData());
    token.set(ComponentRef, this.dialogComponentRef);
    this.appendDialogComponentToBody(token);
    this.dialogComponentRef.instance.childComponentType = componentType;
    const sub = this.dialogComponentRef.instance.afterClosed$.subscribe(() => {
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });
  }

  close() {
    this.dialogComponentRef.instance.close();
  }
}
