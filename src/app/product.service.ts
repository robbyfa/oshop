import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products/').push(product);
  }

  getAll() {
  return this.db
    .list('/products/')
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data: any = a.payload.val();
          const key = a.key;
          return { key, ...data };
        })
      )
    );
}

  get(productId){
    return this.db.object('/products/' + productId).valueChanges();
  }
  
  update(productId, product){
    this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
