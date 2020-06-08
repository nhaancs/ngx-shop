import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
  private itemsRef: AngularFireList<any>;

  constructor(private afDatabase: AngularFireDatabase) { 
    this.itemsRef = this.afDatabase.list('/products')
  }

  create(product: Product) {
    return this.itemsRef.push(product)
  }

  /**
   * Get all products or get products in a specific category
   */
  getAll(category?: string): Observable<Product[]> {
    let query = null
    // If have category, set the filter
    if (category) {
      query = ref => {
        return ref.orderByChild('category').equalTo(category)
      }
    }

    return this.afDatabase.list('/products', query)
      .snapshotChanges()
      .pipe(map(this.toModels))
  }

  get(productId: string): Observable<Product> {
    return this.afDatabase.object('/products/' + productId)
    .snapshotChanges()
    .pipe(map(this.toModel))
  }

  update(productId: string, product: Partial<Product>): Promise<void> {
    return this.itemsRef.update(productId, product)
  }

  delete(productId: string): Promise<void> {
    return this.itemsRef.remove(productId)
  }

  private toModel(res) {
    return res.key ? Product.fromResponse({key: res.key, ...res.payload.exportVal()}): null
  }

  private toModels = (res: any[]) => res.map(this.toModel)
}
