import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartSevice: ShoppingCartService){}

  addToCart(){
    this.cartSevice.addToCart(this.product);
  }

  removeFromCart(){
    this.cartSevice.removeFromCart(this.product);
  }

  getQuantity() {
  if (!this.shoppingCart) return 0;

  const item = this.shoppingCart.items.find(
    (item) => item.product.key === this.product.key
  );
  return item ? item.quantity : 0;
}

  
}
