import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostComponent } from './post.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: PostComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [PostComponent]
})
export class PostModule { }
