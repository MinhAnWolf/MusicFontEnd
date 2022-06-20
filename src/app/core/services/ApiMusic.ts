import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommandURL } from 'src/app/shares/const/BaseURLCommand';

@Injectable({
    providedIn: 'root'
})
export class ApiMusic {



    constructor(private http: HttpClient) { }

    // upFile(json: any) {
    //     return this.http.post<any>(CommandURL.upFile, json);
    // }

    sendData(json: any) {
        // const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        // {headers: headers}
        return this.http.post<any>(CommandURL.sendData, json);
    }

    getList(json: any) {
        return this.http.post<any>(CommandURL.getList, json);
    }

}