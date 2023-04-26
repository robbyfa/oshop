import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, ref, query, orderByChild } from "firebase/database";
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  
  getAll() {
    return this.db.list('/categories/')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.val() as Record<string, unknown> | {};
            const $key = a.payload.key;
            return { $key, ...data };
          })
        )
      );
  }
}
