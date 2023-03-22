import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../categories.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.scss']
})
export class EditCategoryModalComponent implements OnInit {
  @Input() category: string = '';
  @Output() handleCloseModal = new EventEmitter<boolean>();

  public categorySubscription: Subscription = Subscription.EMPTY;
  public categoryForm: FormGroup;
  public updateCategorySubscription: Subscription = Subscription.EMPTY;
  public saveCategorySubscription: Subscription = Subscription.EMPTY;
  public color: string = "";

  constructor(
    private readonly categoriesService: CategoriesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.generateCategoryForm()
    this.getCategoryData();
  }

  private getCategoryData(): void {
    this.categorySubscription =
      this.categoriesService.getCategory(this.category).subscribe(data => {
        this.color = data.color;
        this.categoryForm.controls['name'].setValue(data.name);
        this.categoryForm.controls['color'].setValue(data.color);
      }, err => {

      })
  }

  private generateCategoryForm(): FormGroup {
    return this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(1)]
      ],
      color: [
        '',
        [Validators.required, Validators.minLength(1)]
      ],
    });
  }

  public closeCategoryModal():void {
    this.handleCloseModal.emit(false);
  }

  public submitUpdateCategory():void {
    this.categoryForm.controls['color'].setValue(this.color);
    if(this.categoryForm.valid) {
      Swal.fire({
        title: 'Actualizando categoría',
        didOpen: () => {
          Swal.showLoading()
        },
      });
        this.saveCategorySubscription = this.categoriesService.updateCategory(this.category, this.categoryForm.value).subscribe((data) => {
          Swal.close();
          if (data.name) {
            Swal.fire({
              icon: 'success',
              title: 'Categoría actualizada correctamente',
              showConfirmButton: false,
              timer: 1000
            });
          }
          this.closeCategoryModal();
        }, (err) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.error}`,
          });
        })

    }
  }
}
