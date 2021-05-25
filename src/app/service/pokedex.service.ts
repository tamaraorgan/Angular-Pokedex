import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  url = environment.apiUrl + 'pokemon/';
  _pokemons: any[] = [];
  _next: string = '';

  constructor(private http: HttpClient) {}

  get pokemons(): any[] {
    return this._pokemons;
  }

  get next(): string {
    return this._next;
  }

  set next(next: string) {
    this._next = next;
  }

  //Lista todos os Pokemons
  getPokemons(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  //Lista o type do Pokemons (se ele é fogo, agua, ou normal) objeto
  getType(pokemon: any): string {
    return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
  }

  //Lista lista um pokemon
  get(name: string): Observable<any[]> {
    const url = `${this.url}${name}`;

    return this.http.get<any[]>(url);
  }

  //Lista os polemons com um limite de 50 por pagina
  getNext(): Observable<any[]> {
    const url = this.next === '' ? `${this.url}?limit=50` : this.next;
    return this.http.get<any[]>(url);
  }

  //Lista a evolução do pokemon
  getEvolution(id: number): Observable<any[]> {
    const url = `${environment.apiUrl}evolution-chain/${id}`;
    return this.http.get<any[]>(url);
  }

  //Lista a especie do pokemon
  getSpecies(name: string): Observable<any[]> {
    const url = `${environment.apiUrl}pokemon-species/${name}`;
    return this.http.get<any[]>(url);
  }
}
