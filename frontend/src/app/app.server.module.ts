import { NgModule, InjectionToken } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { BEFORE_APP_SERIALIZED, ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule} from './app.module';
import { AppComponent } from './app.component';

export function getTransferState(transferState: TransferState) {
  return () => {
    return JSON.parse(transferState.toJson());
  };
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: BEFORE_APP_SERIALIZED, useFactory: getTransferState, deps: [TransferState], multi: true }
  ]
})
export class AppServerModule {}
