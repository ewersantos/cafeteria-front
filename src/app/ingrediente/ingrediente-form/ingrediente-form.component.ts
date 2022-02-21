import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IngredienteService } from 'src/app/ingrediente.service';
import { Ingrediente } from '../ingrediente';

@Component({
  selector: 'app-ingrediente-form',
  templateUrl: './ingrediente-form.component.html',
  styleUrls: ['./ingrediente-form.component.css']
})
export class IngredienteFormComponent implements OnInit {

  ingrediente: Ingrediente;
  sucess: boolean = false;
  errors?: String[];
  id: number = 0;

  constructor(private service: IngredienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.ingrediente = new Ingrediente();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getIngredientesById(this.id)
          .subscribe(response => this.ingrediente = response,
            errorResponse => this.ingrediente = new Ingrediente())
      }
    })
  }

  voltarParaListagem() {
    this.router.navigate(['/ingrediente/lista']);
  }

  onSubmit() {
    if (this.id) {
      this.service.atualizar(this.ingrediente)
        .subscribe(response => {
          this.sucess = true;
          this.errors = [];
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o ingrediente.']
        })
    } else {
      this.service.salvar(this.ingrediente)
        .subscribe(response => {
          this.sucess = true;
          this.errors = [];
          this.ingrediente = response;
        }, errorResponse => {
          this.sucess = false;
          this.errors = errorResponse.error.errors;
        })
    }
  }

  uploadImagem(event: any, produto: Ingrediente) {
    const files = event.target.files;
    if(files){
      const imagem = files[0];
      const formData: FormData = new FormData();
      formData.append("imagem", imagem);
      this.service.upload(produto, formData)
        .subscribe(response => this.voltarParaListagem());
    }
  }

}
