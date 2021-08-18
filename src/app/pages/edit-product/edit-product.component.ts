import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewProductStorage, ProductRequest, ProductsService, ProductStorage } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  productForm: FormGroup | any;
  
  @Input() selectedProduct: ProductStorage | NewProductStorage | any;
  allCategories: string[] = [];
  emptyProduct: boolean = true;
  changed: boolean = false;

  constructor(private productsService: ProductsService) {
  }

  async ngOnInit(): Promise<void> {
    let response = await this.productsService.fetchCategories();
    response.subscribe(result => this.allCategories = result);
    
    this.emptyProduct = !this.modeChecking();

    this.productForm = new FormGroup({
      name: new FormControl(this.emptyProduct ? '' : this.selectedProduct.name, Validators.required),
      brand: new FormControl(this.emptyProduct ? '' : this.selectedProduct.brand, Validators.required),
      category: new FormControl(this.emptyProduct ? '' : this.selectedProduct.category, Validators.required),
      price: new FormControl(this.emptyProduct ? '' : this.selectedProduct.price, [Validators.required, Validators.pattern(/^(\d*\.)?\d+$/)]),
      location: new FormControl(this.emptyProduct ? '' : this.selectedProduct.location, Validators.required),
      onSale: new FormControl(this.emptyProduct ? '' : this.productsService.booleanConversion(this.selectedProduct.onSale), Validators.required)
    })
  }

  modeChecking() {
    return this.selectedProduct.productId != null && 'productId' in this.selectedProduct
  }

  updateProduct() {
    this.getSelectedProduct()
    if (this.changed) {
      this.productsService.updateProduct(this.selectedProduct);
    }
  }

  getSelectedProduct() {
    if (this.selectedProduct.name != this.productForm.get('name').value) {
      this.selectedProduct.name = this.productForm.get('name').value;
      this.changed = true;
    }

    if (this.selectedProduct.brand != this.productForm.get('brand').value) {
      this.selectedProduct.brand = this.productForm.get('brand').value;
      this.changed = true;
    }

    if (this.selectedProduct.category != this.productForm.get('category').value) {
      this.selectedProduct.category = this.productForm.get('category').value;
      this.changed = true;
    }

    if (this.selectedProduct.price != this.productForm.get('price').value) {
      this.selectedProduct.price = this.productForm.get('price').value;
      this.changed = true;
    }

    if (this.selectedProduct.location != this.productForm.get('location').value) {
      this.selectedProduct.location = this.productForm.get('location').value;
      this.changed = true;
    }

    if (this.selectedProduct.onSale != this.productsService.stringConversion(this.productForm.get('onSale').value)) {
      this.selectedProduct.onSale = this.productsService.stringConversion(this.productForm.get('onSale').value);
      this.changed = true;
    }

    return this.selectedProduct;
  }

  formValidationCheck() {
    return this.productForm.valid;
  }
}

export interface ProductDetailModel {
  product: ProductStorage;
  allCategories: string[];
}
