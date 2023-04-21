import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartSevice: ShoppingCartService){}

  addToCart(){
    this.cartSevice.addToCart(this.product);
  }

  removeFromCart(){
    this.cartSevice.removeFromCart(this.product);
  }
}
