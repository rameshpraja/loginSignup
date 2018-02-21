import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

import { EndPoint } from '../shared/global';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: Http) { }
registerUser(user){
return this.http.post(EndPoint.register,user)
.delay(2000)
.map(res =>res.json())

}

authenticateUser(user){
let headers =new Headers();
headers.append('Content-Type','application/json');
return this.http.post(EndPoint.login,user,{headers: headers})
.delay(2000)
.map(res =>res.json());
}
storeUserData(token, user){
localStorage.setItem('user_token',token);
localStorage.setItem('user',JSON.stringify(user.id));
localStorage.setItem('name',JSON.stringify(user.name));
this.authToken=token;
this.user=user;
}


getProfile(){
let headers =new Headers();
this.loadToken();
headers.append('Authorization', this.authToken);
headers.append('Content-Type','application/json');
return this.http.get(EndPoint.profile,{headers: headers})
.map(res =>res.json())

}

loadToken(){
const token =localStorage.getItem('user_token' );
this.authToken=token;
}
loggedIn(){
return tokenNotExpired('user_token');
}

logout(){
this.authToken=null;
this.user=null;
localStorage.removeItem('user_token');
}
PostImage(data){
  let headers =new Headers();
  return this.http.post(EndPoint.image, data,{headers: headers})
  .map(response=>response.json())
}
}
