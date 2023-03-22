import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { GridJsAngularModule } from 'gridjs-angular';
import { CategoriesModalComponent } from './categories-modal/categories-modal.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCategoryModalComponent } from './edit-category-modal/edit-category-modal.component';


@NgModule({
  declarations: [CategoriesComponent, CategoriesModalComponent, EditCategoryModalComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    GridJsAngularModule,
    ColorPickerModule,
    ReactiveFormsModule
  ],
})
export class CategoriesModule {}
