import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  url = environment.apiUrl + 'pokemon/'
  pokemons: any[] = []
  next = ''


  constructor(private http: HttpClient) { }

  getPokemons(): Observable<any[]> {
    return this.http.get<any[]>(this.url)
  }
}

