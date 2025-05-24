import { Component, OnDestroy,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DynamicProductService } from '../../app/services/dynamic-product.service';
import { Subscription } from 'rxjs'
import { IProduct } from '../../app/models/iproduct';

@Component({
  selector: 'app-products',
  imports: [CommonModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit,OnDestroy{
  products!:IProduct[];
  mySub1!:Subscription[];
  constructor (private productService:DynamicProductService){}

  ngOnInit(): void {
    this.mySub1.push(this.productService.getAllProducts().subscribe({
      next:(res)=>{
        this.products=res;
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }

    }))
  }
  deleteHandler(id:number){
    console.log("deleting",id,"...");
    this.mySub1.push(this.productService.deleteProduct(id).subscribe({
      next:(res)=>{
        this.products.filter(product=>{
          return product.id != id;
        })
      },
      error:(err)=>{
        console.log("Error deleting product", err);
      }
    }));    
  }

    ngOnDestroy(): void {
      this.mySub1.forEach(sub => {
        sub.unsubscribe();
      });
  }

}