import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _jsonURL = 'assets/univ.json';

  constructor(private httpClient: HttpClient) {
  }

  public getJSON(): Observable<any> {
    return this.httpClient.get(this._jsonURL);
  }
}
