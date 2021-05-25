import { Component, OnInit } from '@angular/core';
import { concat, Subscription } from 'rxjs';
import { PokedexService } from 'src/app/service/pokedex.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  //pokemons: any[] = [];
  subscriptions: Subscription[] = [];
  loading = false;

  constructor(private pokedexService: PokedexService) {}

  ngOnInit(): void {
    //this.getPokedex();
    this.loaderMore();
  }

  // getPokedex() {
  //   this.pokedexService.getPokemons().subscribe((data: any) => {
  //     this.pokemons = data.results;
  //   });
  // }

  get pokemons(): any {
    return this.pokedexService.pokemons;
  }

  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  getType(pokemon: any): string {
    return this.pokedexService.getType(pokemon);
  }

  loaderMore(): void {
    this.loading = true;
    this.subscription = this.pokedexService.getNext().subscribe(
      (response: any) => {
        this.pokedexService.next = response.next;
        const details = response.results.map((i: any) =>
          this.pokedexService.get(i.name)
        );
        this.subscription = concat(...details).subscribe((response: any) => {
          this.pokedexService.pokemons.push(response);
        });
      },
      (error) => console.log('Error Occurred:', error),
      () => (this.loading = false)
    );
  }
}
