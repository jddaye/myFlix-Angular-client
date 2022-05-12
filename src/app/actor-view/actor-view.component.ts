import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-actor-view',
  templateUrl: './actor-view.component.html',
  styleUrls: ['./actor-view.component.css']
})
export class ActorViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Actors: []
    }
  ) { }

  ngOnInit(): void {
  }

}
