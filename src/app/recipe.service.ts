import { Injectable } from '@angular/core';
import { recipe } from 'src/models/recipe.model';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  baseUrl: string = 'https://api.edamam.com/api/recipes/v2';
  value: string = 'chicken';
  appId = '8d3fe01e';
  appKey = 'c4b5f0554e48ceb248e63f0c1236fbc4';
  headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('crossorigin', 'anonymous');

  constructor(private http: HttpClient) { }
  
  public getRecipes(): Observable<any> {
   let url  = this.baseUrl + `?type=public&q=${this.value}&app_id=${this.appId}&app_key=${this.appKey}`;
    return this.http.get(url, {'headers': this.headers});
  }

  public getSingleRecipe(id: string): Observable<any> {
    let url = this.baseUrl + `/${id}?type=public&app_id=${this.appId}&app_key=${this.appKey}`;
    //let rl = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${this.appId}&app_key=${this.appKey}`
    return this.http.get(url, {'headers': this.headers});
  }

  public getByCategory(category: string): Observable<any> {
    let url = this.baseUrl + `?type=public&q=${category}&app_id=${this.appId}&app_key=${this.appKey}`;
    return this.http.get(url, {'headers': this.headers});
  }
}
