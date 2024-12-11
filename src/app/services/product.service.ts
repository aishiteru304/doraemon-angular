import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServerService } from './http-server.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private httpServer: HttpServerService) { }

  public getBestSale() {
    return this.http.get(this.httpServer.HTPP_SERVER + "/books/bestSale", this.httpServer.headerJson())
  }

}
