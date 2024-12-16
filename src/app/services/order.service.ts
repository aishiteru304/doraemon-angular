import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServerService } from './http-server.service';
import { CreateOrderDto } from './dto/order/create-order.dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private httpServer: HttpServerService) { }

  public getOrder() {
    return this.http.get(this.httpServer.HTPP_SERVER + "/order", this.httpServer.headerJson())
  }

  public createOrder(createOrderDto: CreateOrderDto) {
    const { name, address, phone, orderDetails } = createOrderDto
    return this.http.post(this.httpServer.HTPP_SERVER + "/order", { name, address, phone, orderDetails }, this.httpServer.headerJson())
  }
}
