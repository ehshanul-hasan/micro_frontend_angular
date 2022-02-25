import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class HttpService {

    constructor(private http: HttpClient) { }

    public get(url: string) {
        return this.http.get(`${url}`, { headers: this.getCommonHeader() });
    }

    public post(url: string, body: any) {
        return this.http.post(`${url}`, body, { headers: this.getCommonHeader() });
    }

    public postFromData(url: string, body: any) {
        return new HttpRequest('POST', `${url}`, body, {
            reportProgress: true
        });
    }

    public put(url: string, body: any) {
        return this.http.put(`${url}`, body, { headers: this.getCommonHeader() });
    }

    public delete(url: string) {
        return this.http.delete(`${url}`, { headers: this.getCommonHeader() });
    }

    public postFile(url: string, body: any) {
        return new HttpRequest('POST', `${url}`, body, {
            reportProgress: true
        });
    }

    public download(url: string, body: any) {
        return new HttpRequest('POST', `${url}`, body, {
            reportProgress: true,
            responseType: 'blob'
        });
    }

    public getCommonHeader() {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-XSRF-TOKEN'
        };

        return headers;
    }
}


