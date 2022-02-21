import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Componente } from './componente/componente';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {

  apiUrl: string = environment.apiURLBase + '/api/componentes';

  constructor(private http: HttpClient) { }

  salvar(componenete: Componente): Observable<Componente> {
    return this.http.post<Componente>(`${this.apiUrl}`, componenete);
  }

  getComponentes(): Observable<Componente[]> {
    return this.http.get<Componente[]>(this.apiUrl);
  }

  deletar(componenete: Componente): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${componenete.id}`);
  }
}
