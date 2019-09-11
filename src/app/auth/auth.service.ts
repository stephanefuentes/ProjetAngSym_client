import { Injectable } from "@angular/core";
import { Credentials } from "./credentials";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Subject } from 'rxjs';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  //private authToken: string;

  authState = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  authenticate(credentials: Credentials) {
    return this.http
      .post("http://localhost:8000/login_check", credentials)
      .pipe(
        map((resultat: AuthResponse) => {
          //this.authToken = resultat.token;
          window.localStorage.setItem("token", resultat.token);
          this.authState.next(true);
          return resultat;
        })
      );
  }

  logout()
  {
    window.localStorage.removeItem('token');
    this.authState.next(false);
  }

  getToken(): string {
    //return this.authToken;
    return window.localStorage.getItem("token") || null;
  }


  isAuthenticated(): boolean
  {
    return this.getToken() !== null;
  }

}
