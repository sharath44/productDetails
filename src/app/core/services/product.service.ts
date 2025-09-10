import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Product } from '../models/product';
import { of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  public productsSubject = new BehaviorSubject<Product[]>([
    { product_name: "Laptop", brand: "TechBrand", price: 1200, category: "Electronics", in_stock: true },
    { product_name: "Running Shoes", brand: "Sporty", price: 80, category: "Footwear", in_stock: true },
    { product_name: "Coffee Maker", brand: "BrewMaster", price: 150, category: "Home Appliances", in_stock: false },
    { product_name: "Smartphone", brand: "PhoneCo", price: 999, category: "Electronics", in_stock: true },
    { product_name: "Backpack", brand: "TravelGear", price: 60, category: "Accessories", in_stock: true }
  ]);

  products$ = this.productsSubject.asObservable();

  getProduct(index: number): Product | undefined {
    return this.productsSubject.value[index];
  }

  searchProduct(name: string): Product | undefined {
    return this.productsSubject.value.find(p => p?.product_name?.toLowerCase() === name.toLowerCase());
  }

  addProduct(product: Product) {
    const updated = [...this.productsSubject.value, product];
    this.productsSubject.next(updated);
  }

  updateProduct(index: number, product: Product) {
    const updated = [...this.productsSubject.value];
    updated[index] = product;
    this.productsSubject.next(updated);
  }

  deleteProduct(index: number) {
    const updated = [...this.productsSubject.value];
    updated.splice(index, 1);
    console.log("updated",updated);
    this.productsSubject.next(updated);
  }


  getProductById(id: number): Observable<Product> {
    const mockProducts: Record<string, Product> = {
      101: {
        id: 101,
        product_name: 'Laptop',
        price: 1200,
        brand: 'Dell',
        category: 'Electronics',
        in_stock: true
      },
      102: {
        id: 102,
        product_name: 'Phone',
        price: 999,
        brand: 'Samsung',
        category: 'Electronics',
        in_stock: false
      },
      103: {
        id: 103,
        product_name: 'Shoes',
        price: 80,
        brand: 'Nike',
        category: 'Footwear',
        in_stock: true
      }
    };
  
    if (mockProducts[id]) {
      return of(mockProducts[id]).pipe(delay(500)); // simulate latency
    } else {
      return throwError(() => ({ status: 404, message: 'Product not found' }));
    }
  }


  getRetailers():Observable<any>{
    return of({result:['css','Bjs','cooger']}).pipe( map(each => { each.result.push('frommap'); return each}) );
  }
}


