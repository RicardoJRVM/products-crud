import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc ,deleteDoc } from '@angular/fire/firestore';
import Product from '../Product';
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore:Firestore) { 
  }

  addProduct(product:Product){
    const prodRef = collection(this.firestore,'products')
    return addDoc(prodRef,product)
  }

  getProducts():Observable<Product[]> {
    const prodRef = collection(this.firestore,'products')
    return collectionData(prodRef,{idField: 'id'}) as Observable<Product[]>;
  }

  deleteProduct(product:Product) {
    const prodRef = doc(this.firestore,`products/${product.id}`)
    return deleteDoc(prodRef);
  }
}
