//
// Angular HTTP interceptor
// http://stackoverflow.com/questions/42217714/angular-2-http-response-interceptor
// http://stackoverflow.com/questions/34355754/interceptors-in-angular2
// https://medium.com/aviabird/http-interceptor-angular2-way-e57dc2842462
// http://aboutcode.net/2013/07/27/json-date-parsing-angularjs.html

import { Injectable } from '@angular/core';

import {
    Http,
    ConnectionBackend,
    RequestOptions,
    RequestOptionsArgs,
    Request,
    Response,
    Headers
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
export class HttpInterceptor extends Http
{
    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions,
    ) {
        super(backend, defaultOptions);
    }

    /**
     * Performs a request with http get method.
     * @param url
     * @param options
     * @returns {Observable<>}
     */
    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        this.beforeRequest();
        return super.get(url, this.requestOptions(options))
            .catch(this.onCatch)
            .do((res: Response) => {
                res = this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onFinally();
            });
    }

    //
    // Implement POST, PUT, DELETE HERE
    //

    /**
     * Request options.
     * @param options
     * @returns {RequestOptionsArgs}
     */
    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            });
        }
        return options;
    }


    regexIso8601: string = "^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$";
    regexdatetime: RegExp = /T\d{2}:\d{2}:\d{2}/g;  // YYYY-MM-DDT24:00:00

    // Convert datetime values to dates by removing the time portion.
    private stripTime(input) {
        // Ignore things that aren't objects.
        //if (typeof input !== "object") return input;

        //if (input["_body"] != null)
        //console.log("_body: " + input["_body"]);
        var value = input["_body"];
        //var newvalue = value.replace(/T\d{2}:\d{2}:\d{2}/g, "");
        var newvalue = value.replace(this.regexdatetime, "");
        //console.log("_body replace: " + newvalue);
        input["_body"] = newvalue;
        return input;
/*
        for (var key in input) {
            //if (!input.hasOwnProperty(key)) continue;
            var value = input[key];
            var match;
            console.log("key: " + key + "\n");
            // Check for string properties which look like dates.
            if (typeof value === "string" && (match = value.match(this.regexdate))) {
                console.log("key (string): " + key + "\n");
                //var milliseconds = Date.parse(match[0])
                //if (!isNaN(milliseconds)) {
                //    input[key] = new Date(milliseconds);
                //}
            } else if (typeof value === "object") {
                //console.log("key (object): " + key + "\n");
                // Recurse into object
                //this.convertDateStringsToDates(value);
            } else {
                //console.log("key (other): " + key + "\n");
            }
        }
        return input;
*/
    }

    /**
     * Before any Request.
     */
    private beforeRequest(): void {
    }

    /**
     * After any request.
     */
    private afterRequest(): void {
    }

    /**
     * Error handler.
     * @param error
     * @param caught
     * @returns {ErrorObservable}
     */
    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }

    /**
     * onSuccess
     * @param res
     */
    private onSuccess(res: Response): Response {
        //console.log(this.constructor.name + ".onSuccess " + res);
        return this.stripTime(res);
    }

    /**
     * onError
     * @param error
     */
    private onError(error: any): void {
    }

    /**
     * onFinally
     */
    private onFinally(): void {
        this.afterRequest();
    }
}