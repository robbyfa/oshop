import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy{
  @Input('cart') cart: ShoppingCart;
  userId: string;
  userSubscription: Subscription;

  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService){}

  ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);    
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart)
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key])
  }    
}
