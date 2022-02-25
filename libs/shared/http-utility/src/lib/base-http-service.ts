import { HttpService } from './http.service';

export class BaseHttpService {

    private url : string = "";
    private httpService : any;

    constructor( httpservice: HttpService, url : string ) {
        this.httpService = httpservice;
        this.url = url;
    }

    public getById(id : number) {
        return this.httpService.get(`${this.url}/${id}`);
    }

    public get(params : any) {
        return this.httpService.get(this.buildUrl(`${this.url}`, params));
    }
  
    public add(body : any) {
        return this.httpService.post(this.url, body);
    }

    

    public update(id : number, body : any) {
        return this.httpService.put(`${this.url}/${id}`, body);
    }

    public delete(id: number) {
        return this.httpService.delete(`${this.url}/${id}`);
    }

    protected buildUrl(url: string, params : any) {
        var queryString = Object.keys(params).map(key => encodeURIComponent(key)  + '=' + encodeURIComponent(params[key])).join('&');
        const _url = `${url}?${queryString}`;
        return _url;
    }
}
