import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { h, html, UserConfig } from 'gridjs';
import { CategoriesService } from './categories.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  private categoriesColumns: any = [
    {
      id: 'name',
      name: 'Nombre'
    },
    {
      id: 'color',
      name: 'Color',
      formatter: (cell) => html(`<div class="color-identifier" style="background-color: ${cell}"></div>`)
    },
    {
      name: 'Opciones',
      formatter: (cells,row) => {
        return h('div', {
          className: 'options-row',
        }, h('button', {
          className: 'button is-info',
          onClick: () => this.editCategory(cells)
        }, 'Editar'), h('button', {
          className: 'button is-danger ml-1',
          onClick: () => this.deleteCategory(cells)
        }, 'Eliminar'));
      }
    },
  ]

  public categoriesTableConfig: UserConfig = {
    columns: this.categoriesColumns,
    server: {
      url: `${environment.GET_CATERGORIES_URL}`,
      then: data => data.map(category => [category.name, category.color, category._id]),
    },
    pagination: {
      enabled: true,
      limit: 10
    },
    search: true,
    sort: true,
    resizable: true,
  }

  public deleteCategorySubscription: Subscription = Subscription.EMPTY;
  public showCategoryModal: boolean = false;
  public showEditCategoryModal: boolean = false;
  public currentCategory: string = null;

  constructor(
    private router: Router,
    private readonly categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
  }

  public editCategory(category: any):void {
    this.showEditCategoryModal = !this.showEditCategoryModal;
    this.currentCategory = category;
  }

  public deleteCategory(category: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "!No podrás revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCategorySubscription =
          this.categoriesService.deleteCategory(category).subscribe(data => {
            if (data.success) {
              Swal.fire(
                'Eliminada!',
                'La categoría ah sido eliminada.',
                'success'
              )
            }
            this.newCategoryAdded();
          }, err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `${err.error}`,
            });
          })
      }
    })
  }

  public newCategoryAdded(): void {
    this.showCategoryModal = !this.showCategoryModal;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/dashboard/categories']);
  }

  public updatedCategory(): void {
    this.showEditCategoryModal = !this.showEditCategoryModal;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/dashboard/categories']);
  }
}
