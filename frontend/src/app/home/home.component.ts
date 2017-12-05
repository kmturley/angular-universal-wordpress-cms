import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'home',
  template: `<h3>Home</h3><p>{{ message }}</p>`
})
export class HomeComponent implements OnInit {
  public message: string;

  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.message = 'Hello';
    this.title.setTitle('Hello World');
    this.meta.updateTag({ name: 'description', content: 'Hello World description!' });
  }
}