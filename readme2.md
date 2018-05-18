# Dawn
2018/05/18
## 目標
WebAPI實作

## 修改Moon
安裝bootstrap
```
Moon>npm i bootstrap@4.1.0
```
套用bootstrap
styles.scss
```ts
@import "~bootstrap/scss/bootstrap";
```
## 載入HttpClientModuel
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValuesComponent } from './values/values.component';

@NgModule({
  declarations: [
    AppComponent,
    ValuesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
## 建立values component
```
Moon>ng g component values
```
## app.component.html
```html
<div class="container">
    <router-outlet></router-outlet>
</div>
```
## app-routing.module.ts
```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValuesComponent } from './values/values.component';

const routes: Routes = [
  { path: '', redirectTo: '/values', pathMatch: 'full' },
  { path: 'values', component: ValuesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## values.component.html
```html
<ul class="list-group">
  <li class="list-group-item" *ngFor="let item of list">
    {{item}}
  </li>
</ul>
```
## values.components.ts
```ts
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
```
## 建置
```
Moon>npm run build
Sun>dotnet run
```
瀏覽 http://localhost:5000/