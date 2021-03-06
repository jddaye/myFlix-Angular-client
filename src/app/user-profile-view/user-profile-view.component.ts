import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { ActorViewComponent} from '../actor-view/actor-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css']
})

export class UserProfileViewComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  userName: any = localStorage.getItem('user');
  favMovies: any[] = [];
  displayElement: boolean = false

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getFavs()  
  }
  

  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px'
    });
   
  }

  openDirectorDialog(name: string, bio: string, movies: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {Name: name, Bio: bio, Movies: movies},
      width: '500px',
    });
  }

  openActorDialog(name: string, movies: string, birth: string): void {
    this.dialog.open(ActorViewComponent, {
      data: {Name: name, Movies: movies, birth},
      width: '500px',
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUserProfile().subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
      });
    }
  }
  
  openEditUserProfile(): void {
    this.dialog.open(UserEditComponent, {
      width: '500px'
    });
  }
  
  getFavs(): void {
    let movies: any[] = [];
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      movies = res;
      movies.forEach((movie: any) => {
        if (this.user.FavouriteMovies.includes(movie._id)) {
          this.favMovies.push(movie);
          this.displayElement = true;
        }
        });   
    });
  }

  deleteUserProfile(): void {
    if (confirm('Please confirm, this cannot be undone')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account was deleted', 'OK', {duration: 6000});
      });
      this.router.navigate(['welcome'])
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        localStorage.clear();
      });
    }
  }

  removeFav(id: string): void {
    this.fetchApiData.deleteFavoriteMovies(id).subscribe((res: any) => {
      this.snackBar.open('Successfully removed from favorites list.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      return this.favMovies;
    })
  }
}
