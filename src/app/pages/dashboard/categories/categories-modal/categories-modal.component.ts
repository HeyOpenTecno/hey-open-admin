import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../categories.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.scss']
})
export class CategoriesModalComponent implements OnInit {
  @Output() handleCloseModal = new EventEmitter<boolean>();

  public color = "#000000"
  public categoryForm: FormGroup;
  public addCategorySubscription: Subscription = Subscription.EMPTY;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) {}

  public ngOnInit() {
    this.categoryForm = this.generateCategoryForm();
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

  public submitCategoryForm():void {
    this.categoryForm.controls['color'].setValue(this.color);
    if(this.categoryForm.valid) {
      Swal.fire({
        title: 'Registrando categoría',
        didOpen: () => {
          Swal.showLoading()
        },
      });
      this.addCategorySubscription =
        this.categoriesService.addCategory(this.categoryForm.value).subscribe((data) => {
          Swal.close();
          if (data.name) {
            Swal.fire({
              icon: 'success',
              title: 'Categoría creada correctamente',
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
        });
    }
  }
}
