import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { FormsModule } from '@angular/forms';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';


@NgModule({
  declarations: [
    ProdutoFormComponent,
    ProdutoListaComponent
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    FormsModule
  ],
  exports: [
    ProdutoFormComponent,
    ProdutoListaComponent
  ]
})
export class ProdutoModule { }
