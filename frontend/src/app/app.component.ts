import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>Universal Demo using Angular and Angular CLI</h1>
  <app-navigation></app-navigation>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {

}
