import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss']
})
export class ValuesComponent implements OnInit {

  public title: string;
  public list: string[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getList();
    this.connectSignalR();
  }

  getList() {
    this.http.get<string[]>('http://localhost:5000/api/values')
      .subscribe(list => {
        this.list = list;
      });
  }
  connectSignalR() {
    const hub = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/time')
      .build();
    hub.on('send', data => {
      this.title = data;
    });
    hub.start()
      .then(() => hub.invoke('register'));
  }
}
