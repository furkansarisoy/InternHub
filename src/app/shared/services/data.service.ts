import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _uniURL = 'assets/univ.json';
  private _cityURL = 'assets/il-ilce.json';


  constructor(private httpClient: HttpClient) {
  }

  public getUniversitesJSON(): Observable<any> {
    return this.httpClient.get(this._uniURL);
  }

  public getCitiesJSON(): Observable<any> {
    return this.httpClient.get(this._cityURL);
  }
}
