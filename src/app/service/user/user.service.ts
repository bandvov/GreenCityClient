import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const token = localStorage.getItem('accessToken');
let jwtData = null;
let decodedJwtJsonData = null;
let decodedJwtData = null;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
    if (token != null) {
      jwtData = token.split('.')[1];
      decodedJwtJsonData = window.atob(jwtData);
      decodedJwtData = JSON.parse(decodedJwtJsonData);
    }
  }

  getUserRole(): string {
    if (jwtData != null) {
      return decodedJwtData.roles[0];
    } else {
      return null;
    }
  }
}