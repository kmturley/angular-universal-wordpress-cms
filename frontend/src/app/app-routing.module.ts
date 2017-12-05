import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    component: HomeComponent
  },
  {
    pathMatch: 'full',
    path: 'modules/lazy',
    loadChildren: './lazy/lazy.module#LazyModule'
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
