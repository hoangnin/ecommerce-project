import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = environment.shopApiUrl + '/orders'

  constructor(private httpClient: HttpClient) { }

  getOrderHistory(theEmail: string): Observable<GetResponseOrderHistory>{

    // need to build URL base on the customer email
    const OrderHistoryUrl = `${this.orderUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`
    //console.log(theEmail)
    return this.httpClient.get<GetResponseOrderHistory>(OrderHistoryUrl)
  }
}

interface GetResponseOrderHistory{
 _embedded:{
  orders: OrderHistory[]
 }
}