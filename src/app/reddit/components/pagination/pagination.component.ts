import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() previous: string;
  @Input() next: string;
  @Input() category: string;

  constructor() { }

  ngOnInit() {
  }

}
