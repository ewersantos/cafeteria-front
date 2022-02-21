import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { IngredienteFormComponent } from './ingrediente-form/ingrediente-form.component';
import { IngredienteListaComponent } from './ingrediente-lista/ingrediente-lista.component';

const routes: Routes = [
  { path : 'ingrediente', component: LayoutComponent, canActivate: [AuthGuard], children:[
    { path: 'form', component: IngredienteFormComponent },
    { path: 'form/:id', component: IngredienteFormComponent },
    { path: 'lista', component: IngredienteListaComponent },
    { path: '', redirectTo : '/ingrediente/lista', pathMatch: 'full' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredienteRoutingModule { }
