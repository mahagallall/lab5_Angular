import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StaticProductServiceService } from '../../../app/services/static-product-service.service';
import { IProduct } from '../../../app/models/iproduct';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicProductService } from '../../../app/services/dynamic-product.service';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'] // fixed typo: styleUrl -> styleUrls
})
export class ProductEditComponent implements OnInit {
  currentProduct!: IProduct;
  categories: string[] = [];

  constructor(
    private productService: DynamicProductService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    this.activateRoute.paramMap.subscribe({
      next: (params) => {
        const productId = params.get('id');
        if (productId) {
          this.loadProductById(Number(productId));
        }
      }
    });
  }

  

  loadProductById(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        if (res) {
          this.currentProduct = res;
        }
      },
      error: (err) => {
        console.error('Failed to load product:', err);
      }
    });
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

  editHandler(): void {
    this.productService.updateProduct(this.currentProduct).subscribe({
      next: (res) => {
        this.currentProduct = res;
        this.router.navigate(['/products', this.currentProduct.id]);
      },
      error: (err) => {
        console.error('Product update failed:', err);
      }
    });
  }
}
