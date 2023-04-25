import { orderByChild } from 'firebase/database';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(): Observable<any> {
    return this.db.list('/orders/').valueChanges();
  }

  getOrdersByUser(userId): any{
    return this.db.list('/orders', ref => 
      ref.orderByChild('userId').equalTo(userId)
    );
  }
  
}
