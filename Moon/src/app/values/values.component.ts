import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss']
})
export class ValuesComponent implements OnInit {

  public list: string[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.http.get<string[]>('api/values')
      .subscribe(list => {
        this.list = list;
      });
  }
}
