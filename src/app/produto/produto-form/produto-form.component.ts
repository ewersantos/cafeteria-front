import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponenteService } from 'src/app/componente.service';
import { Componente } from 'src/app/componente/componente';
import { IngredienteService } from 'src/app/ingrediente.service';
import { Ingrediente } from 'src/app/ingrediente/ingrediente';
import { ProdutoService } from 'src/app/produto.service';
import { Produto } from '../produto';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {

  produto: Produto;
  sucess: boolean = false;
  errors?: String[];
  id: number = 0;
  idIngrediente: number = 0;
  ingredientes: Ingrediente[] = [];
  componentes: Componente[] = [];
  componenete: Componente = new Componente();


  constructor(private service: ProdutoService,
    private serviceComponente: ComponenteService,
    private serviceIngrediente: IngredienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.produto = new Produto();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getProdutosById(this.id)
          .subscribe(response => this.produto = response,
            errorResponse => this.produto = new Produto())

        this.service.getIngredientes().subscribe(response => this.ingredientes = response);

        this.serviceComponente.getComponentes().subscribe(response => this.componentes = response.filter(com => com.idProduto == this.id));

      }
    })
  }

  voltarParaListagem() {
    this.router.navigate(['/produto/lista']);
  }

  onSubmit() {
    if (this.id) {
      this.service.atualizar(this.produto)
        .subscribe(response => {
          this.sucess = true;
          this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o cliente.']
        })
    } else {
      this.service.salvar(this.produto)
        .subscribe(response => {
          this.sucess = true;
          this.errors = [];
          this.produto = response;
        }, errorResponse => {
          this.sucess = false;
          this.errors = errorResponse.error.errors;
        })
    }
  }

  uploadImagem(event: any, produto: Produto) {
    const files = event.target.files;
    if (files) {
      const imagem = files[0];
      const formData: FormData = new FormData();
      formData.append("imagem", imagem);
      this.service.upload(produto, formData)
        .subscribe(response => this.voltarParaListagem());
    }
  }

  teste(idNumber: any) {
    this.idIngrediente = idNumber;
  }

  adicionaIngrediente(produto: Produto, componente: Componente) {
    componente.idProduto = produto.id;
    componente.idIngrediente = this.idIngrediente;
    this.serviceComponente.salvar(componente).subscribe(response => {
      this.sucess = true;
      this.errors = [];
      this.componenete = new Componente();
      this.serviceComponente.getComponentes().subscribe(response => this.componentes = response.filter(com => com.idProduto == this.id));
    }, errorResponse => {
      this.sucess = false;
      this.errors = errorResponse.error.errors;
      this.serviceComponente.getComponentes().subscribe(response => this.componentes = response.filter(com => com.idProduto == this.id));
    })
  }

  deletarIngrediente(componente: Componente) {
    this.serviceComponente.deletar(componente)
      .subscribe(response => {
        this.sucess = true;
        this.serviceComponente.getComponentes().subscribe(response => this.componentes = response.filter(com => com.idProduto == this.id));
      },
      errorResponse => {
        this.errors = errorResponse.error.errors;
        this.serviceComponente.getComponentes().subscribe(response => this.componentes = response.filter(com => com.idProduto == this.id));
      })
  }

}
