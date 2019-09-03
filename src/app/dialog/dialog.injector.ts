import { Injector } from '@angular/core';

export class DialogInjector implements Injector {
  constructor(
    private _parentInjector: Injector,
    private _additionToken: WeakMap<any, any>
  ) {}
  get<T>(
    token:
      | import('@angular/core').Type<T>
      | import('@angular/core').InjectionToken<T>,
    notFoundValue?: T,
    flags?: import('@angular/core').InjectFlags
  ): T;
  get(token: any, notFoundValue?: any);
  get(token: any, notFoundValue?: any, flags?: any) {
    const value = this._additionToken.get(token);
    if (value) return value;
    return this._parentInjector.get(token, notFoundValue);
  }
}
