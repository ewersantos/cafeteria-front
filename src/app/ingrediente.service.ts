import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ingrediente } from './ingrediente/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  apiUrl: string = environment.apiURLBase + '/api/ingredientes'

  constructor(private http: HttpClient) { }

  salvar(ingrediente: Ingrediente): Observable<Ingrediente> {
    return this.http.post<Ingrediente>(`${this.apiUrl}`, ingrediente);
  }

  atualizar(ingrediente: Ingrediente): Observable<any> {
    return this.http.put<Ingrediente>(`${this.apiUrl}/${ingrediente.id}`, ingrediente);
  }

  getIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.apiUrl);
  }

  getIngredientesById(id: number): Observable<Ingrediente> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deletar(ingrediente: Ingrediente): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${ingrediente.id}`);
  }

  upload(ingrediente: Ingrediente, formData: FormData) : Observable<any>{
    return this.http.put(`${this.apiUrl}/${ingrediente.id}/imagem`, formData, { responseType: 'blob' });
  }
}
