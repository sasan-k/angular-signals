import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { signal } from './signals/signal';
import { computed } from './signals/computed';
import { effect } from './signals/effect';
import { TestArraysCmp } from './testing-arrays.component';
import { TestObjectsCmp } from './testing-objects.component';
import { SettableSignal } from './signals';
import { CommonModule } from '@angular/common';

export class Movie {
  constructor(public name: string, public year: number) {}
}

@Component({
  selector: 'my-app',
  standalone: true,
  template: `

  <div *ngFor="let movie of movies()">
  {{movie.name}} <br>
  {{movie.year}} <br>
  -----------------
  </div>

  <br>
  <br>
  movies count:  {{moviesCount()}}

  <br>
  <br>
  <br>

  <button (click)="add()">Add </button>

  <button (click)="remove()">Remove </button>

  `,
  imports: [CommonModule],
})
export class App {


  movies: SettableSignal<Movie[]> = signal<Movie[]>([]);
  
  moviesCount = computed(() => this.movies().length);

  idx = 0;
  constructor() {
    effect(() => {
      console.log('Movies changed', this.movies());
      // update the backend
    });

    
    this.movies.set([new Movie('movie 1', 1900), new Movie('movie 2', 1901)]);


    this.idx = 2;
  }

  add() {
    this.idx++;

    this.movies.update((movies) => [
      ...movies,
      new Movie(`Movie ${this.idx}`, 1900 + this.idx),
    ]);

  }

  remove() {
    this.idx--;

    this.movies.mutate((movies) => {
      movies.pop()
    });

  }


}

bootstrapApplication(App);
