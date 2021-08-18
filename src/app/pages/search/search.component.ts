import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductStorage, ProductsService} from 'src/app/services/products.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ConfirmationPopUpComponent } from 'src/app/pop-up/confirmation-pop-up/confirmation-pop-up.component';
import { EditProductPopUpComponent } from 'src/app/pop-up/edit-product-pop-up/edit-product-pop-up.component';
import { CreateProductsComponent } from '../../pop-up/create-products/create-products.component';
import { EditBatchPopUpComponent } from 'src/app/pop-up/edit-batch-pop-up/edit-batch-pop-up.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
}) 

export class SearchComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  displayedColumns: string[] = [
    'productId', 'brand', 'category','name', 
    'price', 'quantities', 'onSale', 'location', 
    'cost', 'batches', 'edit', 'add-batch',
    'delete'];
  allProducts: any;
  allCategories: string[] = [];
  allChips: string[] = ["All"];
  expandedProduct: ProductStorage | any;
  keyword: string;
  selectedCategory: string;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  
  constructor(private productService: ProductsService, private fb: FormBuilder, 
    public confirmationDialog: MatDialog, public editProductDialog: MatDialog,
    public createProductDialog: MatDialog, public addBatchDialog: MatDialog) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    this.keyword = ''
    this.selectedCategory = ''
  }
  
  async ngOnInit(): Promise<void> {
    this.allProducts = new MatTableDataSource();
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.productService.getAllProducts()
      .subscribe(products => {
        this.allProducts = new MatTableDataSource(products);
        this.allProducts.sort = this.sort;
        this.paginatorSetUp();
      });
  }

  async getAllCategories() {
    (await this.productService.fetchCategories())
      .subscribe((categories: string[]) => {
        this.allCategories = categories;
        this.allChips = ["All"];
        this.allChips = this.allChips.concat(this.allCategories);
      });
  }

  setExpandedProduct(product: any){
    this.expandedProduct = product;
  }

  handleSearch() {
    this.paginatorSetUp();
    this.allProducts.sort = this.sort;

    if (this.keyword.trim().length != 0) {
      this.productService.searchProducts(this.keyword.toLocaleLowerCase(), this.selectedCategory)
      .subscribe(result => {
        this.allProducts = new MatTableDataSource(result);
      });
    }
    else {
      this.productService.getProductsByCategory(this.selectedCategory)
      .subscribe(result => this.allProducts = new MatTableDataSource(result)); 
    }
  }

  selectChipChange($event: any, category: string) {
    if (category != null && this.selectedCategory != category) {
      if (category.toLowerCase() == "all") {
        this.selectedCategory = "";
      }
      else {
        this.selectedCategory = category;
      }
      this.handleSearch();
    }
  }

  paginatorSetUp() {
    this.allProducts.paginator = this.paginator;
    if (this.allProducts.paginator) {
      this.allProducts.paginator.firstPage();
    }
  }

  handleDelete(productId: number) {
    const dialogRef = this.confirmationDialog.open(ConfirmationPopUpComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure to delete this product and its associated batches?'
      }
    })

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.productService.deleteProduct(productId);
      }
    });
  }

  handleEdit(product: ProductStorage) {
    console.log(product.name)
    const dialogRef = this.editProductDialog.open(EditProductPopUpComponent, {
      data: {
        product: product,
        allCategories: this.allCategories
      },
      panelClass: 'edit-product-dialog'
    })

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        // TODO: update 
      }
    });
  }

  handleAddBatch() {
    const dialogRef = this.addBatchDialog.open(EditBatchPopUpComponent, {
      data: {
        batch: {
          productId: this.expandedProduct.productId,
          quantities: 0,
          cost: 0,
          manufacturer: "",
          purchasedDate: undefined,
          expirationDate: undefined
        },
        title: 'Create Batch'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        // TODO: update 
      }
    });
  }

  handleAddProduct() {
    const dialogRef = this.editProductDialog.open(CreateProductsComponent, {
      data: {
        allCategories: this.allCategories
      },
      panelClass: 'create-product-dialog'
    });
  }

}



