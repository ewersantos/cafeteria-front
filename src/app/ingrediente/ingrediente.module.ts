import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredienteRoutingModule } from './ingrediente-routing.module';
import { IngredienteFormComponent } from './ingrediente-form/ingrediente-form.component';
import { IngredienteListaComponent } from './ingrediente-lista/ingrediente-lista.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IngredienteFormComponent,
    IngredienteListaComponent
  ],
  imports: [
    CommonModule,
    IngredienteRoutingModule,
    FormsModule
  ],
  exports: [
    IngredienteFormComponent,
    IngredienteListaComponent
  ]
})
export class IngredienteModule { }
