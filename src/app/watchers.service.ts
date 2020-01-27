import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WatchersService {
  private URL = "https://des-watchers.herokuapp.com/api/members";
  // private URL = "http://localhost:3000/members"

  constructor(private http: HttpClient) { 

  }

  getAllWatchers(){
    let headerJson = {
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
    }
    const headers = new HttpHeaders(headerJson);
    return this.http.get(this.URL, {headers}).pipe(map((responce:any) => responce));
}
}
