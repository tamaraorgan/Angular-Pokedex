import { Component, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/service/pokedex.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  pokemons: any[] = [];

  constructor(private pokedexService: PokedexService) {}

  ngOnInit(): void {
    this.getPokedex();
  }

  getPokedex() {
    this.pokedexService.getPokemons().subscribe((data: any) => {
      this.pokemons = data.results;
    });
  }
}
