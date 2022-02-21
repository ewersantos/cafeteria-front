import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/produto.service';
import { Produto } from '../produto';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.css']
})
export class ProdutoListaComponent implements OnInit {

  produtos: Produto[] = [];
  produtoSelecionado: Produto = new Produto();
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(private service: ProdutoService, private router: Router) { }

  ngOnInit(): void {
    this.service.getProdutos().subscribe(response => this.produtos = response);
  }

  novoCadastro() {
    this.router.navigate(['/produto/form']);
  }

  preparaDelecao(produto: Produto) {
    this.produtoSelecionado = produto;
  }

  deletarCliente() {
    this.service.deletar(this.produtoSelecionado)
      .subscribe(response => {
        this.mensagemSucesso = 'Produto deletado com sucesso!'
        this.ngOnInit();
      },
        erro => this.mensagemErro = 'Ocorreu um erro ao deletar o produto.')
  }

}
