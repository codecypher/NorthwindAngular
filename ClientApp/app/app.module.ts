//
// Create an Angular 2 and .NET Core app that can be edited using Visual Studio 2017
// https://jonhilton.net/2016/12/13/angular-2-and-net-core-your-first-component/
// https://jonhilton.net/2017/01/16/display-the-weather-using-angular-2-and-net-core-web-api/
//

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//import { Http, HttpModule, XHRBackend, RequestOptions } from '@angular/http';
//import { HttpInterceptor } from './http-interceptor.service';

import { UniversalModule } from 'angular2-universal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component'
import { Logger } from './logger.service';

import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';

import { NorthwindModule } from './components/northwind/northwind.module';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [
        Logger,
        //{
        //    provide: Http,
        //    useClass: HttpInterceptor,
        //    useFactory: (backend: XHRBackend, options: RequestOptions) => {
        //        return new HttpInterceptor(backend, options);
        //    },
        //    deps: [ XHRBackend, RequestOptions ]
        //}
    ],
    imports: [
        // Must be first import. 
        // This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        UniversalModule,
        CommonModule,
        FormsModule,
        HttpModule,
        NorthwindModule,
        AppRoutingModule
    ]
})

export class AppModule {
}
