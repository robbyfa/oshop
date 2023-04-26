import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'app/shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;

  limit = 10;
  maxPage: number;
  curPage: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.subscription = this.productService.getAll().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products; // Initialize the filteredProducts
      
    });
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
   
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  
}
