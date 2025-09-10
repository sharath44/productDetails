import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    product_name: '',
    brand: '',
    price: 0,
    category: '',
    in_stock: false
  };
  index?: number;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public productService: ProductService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.index = +id;
      const existing = this.productService.getProduct(this.index);
      if (existing) {
        this.product = { ...existing };
      }
    }
  }

  submit() {
    if (this.index != null) {
      this.productService.updateProduct(this.index, this.product);
    } else {
      this.productService.addProduct(this.product);
    }
    this.router.navigate(['/product', 0]);
  }
  
}
