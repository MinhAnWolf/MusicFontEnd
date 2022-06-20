import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {

  mode:any = 'side';
  hasBackdrop:boolean = false;
  constructor() { }

  ngOnInit(): void {
    
  }



}
