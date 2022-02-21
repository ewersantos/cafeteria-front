import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';

const routes: Routes = [
  { path : 'produto', component: LayoutComponent, canActivate: [AuthGuard], children:[
    { path: 'form', component: ProdutoFormComponent },
    { path: 'form/:id', component: ProdutoFormComponent },
    { path: 'lista', component: ProdutoListaComponent },
    { path: '', redirectTo : '/produto/lista', pathMatch: 'full' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
