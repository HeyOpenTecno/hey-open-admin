import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { h, html, UserConfig } from 'gridjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  private productsColumns: any = [
    {
      id: 'image',
      name: 'Imagen',
      formatter: (cell) => {
        return html(`
        <figure class="image is-48x48">
          <img src="${cell}">
        </figure>
        `)
      }
    },
    {
      id: 'name',
      name: 'Nombre'
    },
    {
      id: 'stock',
      name: 'Stock'
    },
    {
      id: 'price',
      name: 'Precio'
    },
    {
      id: 'isFeatured',
      name: 'Destacado',
      formatter: (cell) => {
        if (cell) {
          return html(`<span class="tag is-success">Destacado</span>`)
        } else {
          return html(`<span class="tag is-info">No Destacado</span>`)
        }
      }
    },
    {
      name: 'Opciones',
      formatter: (cells,row) => {
        return h('div', {
          className: 'options-row',
        }, h('button', {
          className: 'button is-info',
          onClick: () => console.log('asdsa')
        }, 'Editar'), h('button', {
          className: 'button is-danger ml-1',
          onClick: () => console.log('asdsa')
        }, 'Eliminar'),  h('button', {
          className: 'button is-warning ml-1',
          onClick: () => this.showProduct(cells)
        }, 'Ver Detalles'));
      }
    },
  ]

  public productsTableConfig: UserConfig = {
    columns: this.productsColumns,
    server: {
      url: `${environment.GET_PRODUCTS_URL}`,
      then: data => data.map(category => [
        category.image,
        category.name,
        category.stock,
        category.price,
        category.isFeatured,
        category._id
      ]),
    },
    pagination: {
      enabled: true,
      limit: 10
    },
    search: true,
    sort: true,
    resizable: true,
  }

  public showNewProductModal: boolean = false;
  public showProductModal: boolean = false;
  public currentproduct = null;

  constructor(
    private router: Router
  ) {}

  public showProduct(product: any):void {
    this.showProductModal = !this.showProductModal;
    this.currentproduct = product;
  }

  public newProductAdded(): void {
    this.showNewProductModal = !this.showNewProductModal;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/dashboard/products']);
  }
}
