import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule} from './app.module';
import { AppComponent } from './app.component';

import { ServerTransferStateJsonModule } from './shared/transfer_state_json';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateJsonModule,
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
