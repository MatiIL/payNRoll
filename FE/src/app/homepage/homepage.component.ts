import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

    title: string = 'The title';
    constructor() {}
  
    ngOnInit() {}
  
    // updateTitle(value) {
    //   console.log(`updateTitle: ${value}`);
    //   this.title = value;
    // }

  }

