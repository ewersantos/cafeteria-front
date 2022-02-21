import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngredienteService } from 'src/app/ingrediente.service';
import { Ingrediente } from '../ingrediente';

@Component({
  selector: 'app-ingrediente-lista',
  templateUrl: './ingrediente-lista.component.html',
  styleUrls: ['./ingrediente-lista.component.css']
})
export class IngredienteListaComponent implements OnInit {

  ingredientes: Ingrediente[] = [];
  ingredienteSelecionado: Ingrediente = new Ingrediente();
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(private service: IngredienteService, private router: Router) { }

  ngOnInit(): void {
    this.service.getIngredientes().subscribe(response => this.ingredientes = response);
  }

  novoCadastro() {
    this.router.navigate(['/ingrediente/form']);
  }

  preparaDelecao(ingrediente: Ingrediente) {
    this.ingredienteSelecionado = ingrediente
  }

  deletarIngrediente() {
    this.service.deletar(this.ingredienteSelecionado)
      .subscribe(response => {
        this.mensagemSucesso = 'Ingrediente deletado com sucesso.'
        this.ngOnInit();
      },
        erro => this.mensagemErro = 'Ocorreu um erro ao deletar o ingrediente.')
  }

}
