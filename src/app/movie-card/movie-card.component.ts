import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { ActorViewComponent } from '../actor-view/actor-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { Data } from '@angular/router';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})

// interface Genre {
//   _id: string
//    Name: string;
//    Description: string;
//  }

export class MovieCardComponent {
  movies: any[] = [];
  genres: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,) { }

ngOnInit(): void {
  this.getMovies();
  // this.getGenre();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

getGenre(Name: string): any {
  this.fetchApiData.getGenre(Name).subscribe((resp: any) => {
      this.genres = resp;
      console.log(this.genres);
      return this.genres;
    });
}

openGenre(Name: string): void {
  let name;
  // const genre = this.getGenre(Name)
  // console.log(genre);

  // for(let i=0; i<this.genres.length; i ++) {
  //   console.log(this.genres[i]._id)
  //     if (this.genres[i]._id == id) {
  //       name = this.genres[i].Name;
  //       description = this.genres[i].Description;
  //       break;
  //     }
  // }
  this.dialog.open(GenreViewComponent, {
    data: {
      Name: Name,
      // Description: genre.Description,
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

openActor(Actors: []): void {
  this.dialog.open(ActorViewComponent, {
    data: {
      Actors
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