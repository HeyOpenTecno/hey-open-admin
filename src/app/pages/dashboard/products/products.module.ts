import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { GridJsAngularModule } from 'gridjs-angular';
import { ColorPickerModule } from 'ngx-color-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NewProductModalComponent } from './new-product-modal/new-product-modal.component';


@NgModule({
  declarations: [ProductsComponent, ProductDetailsComponent, NewProductModalComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    GridJsAngularModule,
    ColorPickerModule,
    ReactiveFormsModule
  ],
})
export class ProductsModule {}
