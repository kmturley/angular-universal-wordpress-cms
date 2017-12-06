import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './category.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CategoryComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [CategoryComponent]
})
export class CategoryModule { }
