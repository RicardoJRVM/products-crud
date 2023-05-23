import { Component,OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import Product from './Product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formulario!: FormGroup;
  datos:Product[] = []


constructor (private productService:ProductsService,private formBuilder: FormBuilder){
}

ngOnInit() {
  this.inicializarFormulario();
  this.fetchData()
}

fetchData(){
  this.productService.getProducts().subscribe(products => {
    this.datos = products
  })
}

private inicializarFormulario() {
  this.formulario = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    units: ['', Validators.required]
  });
}

async enviarFormulario() {
  if (this.formulario!.valid) {
    const response = await this.productService.addProduct(this.formulario!.value)
    console.log(response)
    this.fetchData()
  }
}

async onClickDelete(product:Product){
  const response = await this.productService.deleteProduct(product)
  console.log(response)
  this.fetchData()
}
}
