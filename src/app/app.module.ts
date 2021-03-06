import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SearchComponent } from './pages/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from 'src/environments/environment';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AssociatedBatchesComponent } from './pages/associated-batches/associated-batches.component';
import { CreateProductsComponent } from './pop-up/create-products/create-products.component';
import { MatStepperModule } from '@angular/material/stepper';
import { EditBatchComponent } from './pages/edit-batch/edit-batch.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationPopUpComponent } from './pop-up/confirmation-pop-up/confirmation-pop-up.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { EditProductPopUpComponent } from './pop-up/edit-product-pop-up/edit-product-pop-up.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditBatchPopUpComponent } from './pop-up/edit-batch-pop-up/edit-batch-pop-up.component';
import { AuthModule } from '@auth0/auth0-angular';

export const apiBaseUrl : string = environment.baseUrl;


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ProductDetailComponent,
    AssociatedBatchesComponent,
    CreateProductsComponent,
    EditBatchComponent,
    ConfirmationPopUpComponent,
    EditProductComponent,
    EditProductPopUpComponent,
    EditBatchPopUpComponent,
  ],
  imports: [
    AuthModule.forRoot({
      domain: 'dev-36e0xr0f.us.auth0.com',
      clientId: 'zgjbKkTs2SM5Po6FWRS58JmZrnVbMmiE'
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatExpansionModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatStepperModule,
    MatChipsModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }