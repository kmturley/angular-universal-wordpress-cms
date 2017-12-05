import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AppRoutingService } from '../app-routing.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
    public items: Array<any>;
    private root = 'http://localhost:8080';

    constructor(
        private router: Router,
        private routeService: AppRoutingService
    ) { }

    ngOnInit() {
        this.items = this.routeService.routes;
        const routerConfig = this.router.config;
        this.items.forEach(route => {
            routerConfig.push({
                pathMatch: 'full',
                path: route.link.slice(this.root.length + 1, -1),
                loadChildren: './lazy/lazy.module#LazyModule'
            });
        });
        console.log('getRoutes', routerConfig);
        this.router.resetConfig(routerConfig);
    }

}
