import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ingrediente } from './ingrediente/ingrediente';
import { Produto } from './produto/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  apiUrl: string = environment.apiURLBase + '/api/produtos';
  apiUrlIngrediente: string = environment.apiURLBase + '/api/ingredientes';

  constructor(private http: HttpClient) { }

  salvar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiUrl}`, produto);
  }

  atualizar(produto: Produto): Observable<any> {
    return this.http.put<Produto>(`${this.apiUrl}/${produto.id}`, produto);
  }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  getProdutosById(id: number): Observable<Produto> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deletar(produto: Produto): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${produto.id}`);
  }

  upload(produto: Produto, formData: FormData) : Observable<any>{
    return this.http.put(`${this.apiUrl}/${produto.id}/imagem`, formData, { responseType: 'blob' });
  }

  getIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.apiUrlIngrediente);
  }
}
