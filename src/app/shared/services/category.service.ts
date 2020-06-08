import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'shared/models/category';

@Injectable()
export class CategoryService {
  private itemsRef: AngularFireList<any>;
  private itemsSortedRef: AngularFireList<any>;

  constructor(private afDatabase: AngularFireDatabase) { 
    this.itemsRef = this.afDatabase.list('/categories')
    this.itemsSortedRef = this.afDatabase.list('/categories', ref => {
      return ref.orderByChild('name')
    })
  }

  getAll(): Observable<Category[]> {
    return this.itemsSortedRef.snapshotChanges()
      .pipe(map(this.toModels))
  }

  create(category: Category) {
    // TODO: prevent update existing key
    return this.itemsRef.set(category.key, Category.toCreateRequest(category))
  }

  get(categoryId: string): Observable<Category> {
    return this.afDatabase.object('/categories/' + categoryId)
    .snapshotChanges()
    .pipe(map(this.toModel))
  }

  update(categoryId: string, category: Partial<Category>): Promise<void> {
    return this.itemsRef.update(categoryId, category)
  }

  delete(categoryId: string): Promise<void> {
    return this.itemsRef.remove(categoryId)
  }

  private toModel = res => res.key ? Category.fromResponse({key: res.key, ...res.payload.exportVal()}) : null

  private toModels = (res: any[]) => res.map(this.toModel)
}
