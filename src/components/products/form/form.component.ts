import { Component, OnInit } from '@angular/core';
import { StaticProductServiceService } from '../../../app/services/static-product-service.service';
import { IProduct } from '../../../app/models/iproduct';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DynamicProductService } from '../../../app/services/dynamic-product.service';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'] // fixed "styleUrl" to "styleUrls"
})
export class ProductFormComponent implements OnInit {

  public newProductName: string = '';
  categories: string[] = [];
newProductPrice: number | null = null;
newProductStock: number | null = null;
newProductCategory: string = '';

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    stock: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required])
  });

  constructor(private productService: DynamicProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      }
    });
  }

  addProductHandler(): void {
    if (!this.productForm.valid) {
      return;
    }

    const { name, price, stock, category } = this.productForm.value;

    const newProduct: IProduct = {
      id: 0,
      name: name as string,
      price: Number(price),
      stock: Number(stock),
      category: category as string
    };

    console.log("New Product:", newProduct);

    this.productService.addProduct(newProduct).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Product add failed:', err);
      }
    });
  }

  isValidAddProductForm(): boolean {
    return this.productForm.valid;
  }

  get getName() {
    return this.productForm.controls['name'];
  }

  get getPrice() {
    return this.productForm.controls['price'];
  }

  get getStock() {
    return this.productForm.controls['stock'];
  }

  get getCategory() {
    return this.productForm.controls['category'];
  }
}
