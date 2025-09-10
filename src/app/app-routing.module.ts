import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: "full" },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'product', component: ProductDetailComponent },
  { path: 'add', component: ProductFormComponent },
  { path: 'edit/:id', component: ProductFormComponent },
  { path: '**', component: ProductDetailComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
