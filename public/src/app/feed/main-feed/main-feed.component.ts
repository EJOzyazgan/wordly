import { Component, OnInit } from '@angular/core';
import {Post} from "../../models/post";

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent implements OnInit {

  feed = [new Post("", "", "Post 1", "uploads/pics/1532683119752.png"),
    new Post("", "", "Post 1", "uploads/pics/1532683119752.png"),
    new Post("", "", "Post 1", "uploads/pics/1532683119752.png")];

  constructor() { }

  ngOnInit() {
  }

}
