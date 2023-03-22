import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../categories/categories.service';
import { ProductsService } from '../products.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-new-product-modal',
  templateUrl: './new-product-modal.component.html',
  styleUrls: ['./new-product-modal.component.scss']
})
export class NewProductModalComponent implements OnInit {
  @Output() handleCloseModal = new EventEmitter<boolean>();
  public productForm: FormGroup;
  public categories: Array<any> = [];
  public fileName: string = ''

  constructor(
    private fb: FormBuilder,
    private readonly categoriesService: CategoriesService,
    private readonly productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productForm = this.generateCategoryForm();
    this.getCategories();
  }

  private generateCategoryForm(): FormGroup {
    return this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(1)]
      ],
      price: [
        '',
        [Validators.required]
      ],
      category: [
        '',
        [Validators.required]
      ],
      brand: [
        '',
        [Validators.required]
      ],
      image: [
        '',
        [Validators.required]
      ],
      stock: [
        '',
        [Validators.required]
      ],
      isFeatured: [
        '',
        [Validators.required]
      ],
      description: [
        '',
        [Validators.required],
      ],
      richDescription: [
        '',
      ]
    });
  }

  public closeProductModal():void {
    this.handleCloseModal.emit(false);
  }

  public getCategories(): void {
    this.categoriesService.getCategories().subscribe((data) => {
      this.categories = data;
    })
  }

  public onImageUpload(event: any):void {
    const file = event.target.files[0];
    if (file) {
      console.log(file)
      this.fileName = file.name;
      this.productForm.patchValue({image: file})
      this.productForm.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
      }
      fileReader.readAsDataURL(file)
    }
  }

  public handleCategorySubmit(): void {
    if (this.productForm.valid) {
      Swal.fire({
        title: 'Registrando producto',
        didOpen: () => {
          Swal.showLoading()
        },
      });
      const productFormData = new FormData();

      Object.keys(this.productForm.value).map((key) => {
        productFormData.append(key, this.productForm.controls[key].value);
      });

      this.productService.addProduct(productFormData).subscribe((data) => {
        Swal.close();
        if (data) {
          Swal.fire({
            icon: 'success',
            title: 'Producto creado correctamente',
            showConfirmButton: false,
            timer: 1000
          });
        }
        this.closeProductModal();
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
