import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { ActorViewComponent } from '../actor-view/actor-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  movies: any[] = [];
  genres: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }

ngOnInit(): void {
  this.getMovies();
  this.getGenre();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

getGenre(): void {
  this.fetchApiData.getGenre().subscribe((resp: any) => {
      this.genres = resp;
      console.log(this.genres);
      return this.genres;
    });
}

openGenre(id: string): void {
  let name;
  let description;
  console.log(id);

  for(let i=0; i<this.genres.length; i ++) {
    console.log(this.genres[i]._id)
      if (this.genres[i]._id == id) {
        name = this.genres[i].Name;
        description = this.genres[i].Description;
        break;
      }
  }
  this.dialog.open(GenreViewComponent, {
    data: {
      Name: name,
      Description: description,
    },
    width: '500px',
    backdropClass: 'backdropBackground'
  });
}

openDirector(name: string, bio: string, movies: string): void {
  this.dialog.open(DirectorViewComponent, {
    data: {
      Name: name,
      Bio: bio,
      Movies: movies,
    },
    width: '500px',
    backdropClass: 'backdropBackground'
  });
}

openActor(name: string, movies: string): void {
  this.dialog.open(ActorViewComponent, {
    data: {
      Name: name,
      Movies: movies,
    },
    width: '500px',
    backdropClass: 'backdropBackground'
  });
}

openSynopsis(title: string, imagePath: any, description: string): void {
  this.dialog.open(SynopsisViewComponent, {
    data: {
      Title: title,
      ImagePath: imagePath,
      Description: description,
    },
    width: '500px',
    backdropClass: 'backdropBackground'
  });
}


}