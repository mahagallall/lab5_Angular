import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StaticProductServiceService } from '../../../app/services/static-product-service.service';
import { IProduct } from '../../../app/models/iproduct';
import { CommonModule } from '@angular/common';
import { DynamicProductService } from '../../../app/services/dynamic-product.service';
@Component({
  selector: 'app-view_p',
  imports: [CommonModule,RouterLink],
  templateUrl: './view_p.component.html',
  styleUrl: './view_p.component.css'
})
export class ProductViewComponent implements OnInit{
  productId?:number;
  product?:IProduct;
  constructor(private activatedRoute:ActivatedRoute,private productService:DynamicProductService){}
  ngOnInit(): void {
   
    this.activatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.productId = Number(params.get('id'));
      }
    })
    this.productService.getProductById(Number(this.productId)).subscribe({
      next:(res)=>{
        this.product = res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
