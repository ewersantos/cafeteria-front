import { Component, OnInit } from '@angular/core';
import { ComponenteService } from '../componente.service';
import { Componente } from '../componente/componente';
import { IngredienteService } from '../ingrediente.service';
import { ProdutoService } from '../produto.service';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  produtos: Produto[] = [];
  componentes: Componente[] = [];

  constructor(private service: ProdutoService,
    private serviceIngredientes: IngredienteService,
    private componenteService: ComponenteService) { }

  ngOnInit(): void {
    this.service.getProdutos().subscribe(response => this.produtos = response);
  }

  desabilitarVenda(produto: Produto) : boolean{
    let valida = false;
    let componentes: Componente[] = [];
    let quantidade: number = 0;
    this.componenteService.getComponentes().subscribe(response => componentes = response.filter(c => c.idProduto = produto.id));
    for(let componente of componentes){
      this.serviceIngredientes.getIngredientesById(componente.idIngrediente).subscribe(response => quantidade = response.quantidade);
      if(quantidade >= componente.quantidade){
        valida = false;
      } else {
        valida = true;
        break;
      }
    }
    return valida;
  }

  vender(produto: Produto){
    let quantidade: number = 0;
    this.componenteService.getComponentes().subscribe(response => this.componentes = response);
    for(let componente of this.componentes){
      this.serviceIngredientes.getIngredientesById(componente.idIngrediente).subscribe(response => {
        response.quantidade = response.quantidade - componente.quantidade;
        this.serviceIngredientes.atualizar(response);
      });
    }
  }

}
