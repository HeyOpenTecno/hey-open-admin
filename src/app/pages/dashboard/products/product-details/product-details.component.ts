import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input() productId: string = '';
  @Output() handleCloseModal = new EventEmitter<boolean>();

  public productSubscription: Subscription = Subscription.EMPTY;
  public product = null;

  constructor(
    private readonly productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getCategoryData();
  }

  public closeCategoryModal():void {
    this.handleCloseModal.emit(false);
  }

  private getCategoryData(): void {
    this.productSubscription =
      this.productsService.getProduct(this.productId).subscribe(data => {
        this.product = data
      }, err => {

      })
  }
}
