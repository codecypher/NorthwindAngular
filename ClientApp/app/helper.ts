/**
 * helper.ts
 * This is a helper class with methods that are useful
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Logger } from './logger.service';

@Injectable()
export class Helper
{
    constructor(private _logger: Logger) { }

    // Extract JSON data from a Response
    public extractData(response: Response) {
        let data = response.json();
        return data || {};
    }

    // Handle an error from a Response
    public handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;

        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.error(errMsg);
        this._logger.log(errMsg);

        //return Observable.throw(errMsg);
        return Promise.reject(errMsg);
    }

    // Print error to log
    public logError(error: any) {
        let errMsg: string;
        errMsg = error.message ? error.message : error.toString();
        this._logger.log(errMsg);
    }
}
