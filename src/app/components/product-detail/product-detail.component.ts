import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product';
import { FormControl } from '@angular/forms';
import { Observable, from, of, throwError, timer } from 'rxjs';
import { mergeMap, catchError, map, tap, delay, find, concatMap, delayWhen, retry } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  index!: number;
  searchTerm = '';
  // searchTerm: FormControl = new FormControl('');
  nextDisabled: boolean = false;
  prevDisabled: boolean = true;
  products = this.productService.productsSubject.value;


  productIds = [101, 102, 103, 104];
  results: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.products = this.productService.productsSubject.value;
    console.log("Subscribe outside");

    this.route.paramMap.subscribe(params => {
      this.products = this.productService.productsSubject.value;
      console.log("Subscribe inside");
      console.log(this.products)
      const idParam = params.get('id');
      console.log('Route param id:', idParam);

      this.index = idParam ? +idParam : 0;
      console.log('Resolved index:', this.index);

      const lastIndex = this.products.length - 1;

      this.prevDisabled = this.index <= 0;
      this.nextDisabled = this.index >= lastIndex;
      const data = this.products[this.index];
      if (data) {
        this.product = data;
      }
    });
    this.productService.products$.subscribe((value) => {
      console.log('value', value);
      console.log('value', this.index);
      this.products = value;
      const data = value[this.index];
      console.log('data', data);

      // if (data) {
        this.product = data;
      // }
    });



    // from(this.productIds).pipe(
    //  this.mergeMapWithErrorTag(id => this.productService.getProductById(id))
    // ).subscribe(tagged => {
    //   this.results.push(tagged);
    //   if (tagged.error) {
    //     console.warn(`Product ${tagged.input} failed:`, tagged.error);
    //   } else {
    //     console.log(`Product ${tagged.input} loaded:`, tagged.result);
    //   }
    // });
let count: number[] = [1,2,3,4];
console.log("start ==>")
   // from(count).pipe(map((each)=>{return each*2}),delay(1000),map((each)=> each+1)).subscribe(result => console.log(result));

    from([1,2,13,4]).pipe(concatMap((each) => {
      let result$;
      if(count.includes(each)){
        result$ = of({numberfound:'Yes',number:each});
      }else{
        result$ = throwError(() => ({errorMessage:'NumbernotFound', status:404, number: each})).pipe(catchError((error) => of({'error':error})));
      }
      return result$    }),tap(() => console.log('delay started')),delay(2000),tap(()=>console.log('delay ended'))
     ).subscribe(result => console.log(result));


    this.productService.getRetailers().subscribe(res => console.log('check', res))




  }

  next() {
    const products = this.productService.productsSubject.value;
    if (this.index < products.length - 1) {
      this.router.navigate(['/product', this.index + 1]);
    }
  }

  prev() {
    if (this.index > 0) {
      this.router.navigate(['/product', this.index - 1]);
    }
  }

  deleteProduct() {
    this.productService.deleteProduct(this.index);
    this.router.navigate(['/product', 0]);
  }

  editProduct() {
    this.router.navigate(['/edit', this.index]);
  }

  addProduct() {
    this.router.navigate(['/add']);
  }


  searchProduct() {
    const result = this.productService.searchProduct(this.searchTerm);
    if (result) {
      const index = this.productService.productsSubject.value.findIndex(
        p => p?.product_name?.toLowerCase() === this.searchTerm.toLowerCase()
      );
      this.router.navigate(['/product', index]);
    } else {
      alert('Product not found');
    }
  }

 
  
  mergeMapWithErrorTag<T, R>(
    project: (value: T) => Observable<R>
  ): (source$: Observable<T>) => Observable<TaggedResult<T, R>> {
    return (source$: Observable<T>) =>
      source$.pipe(
        mergeMap(input =>
          project(input).pipe(
            // On success, emit result
            mergeMap(result => of({ input, result })),
            // On error, emit tagged error
            catchError(error => of({ input, error }))
          )
        )
      );
  }
  


}

interface TaggedResult<T, R> {
  input: T;
  result?: R;
  error?: any;
}