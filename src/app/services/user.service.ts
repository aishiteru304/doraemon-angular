import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpServerService } from './http-server.service';
import { LoginDto } from './dto/user/login.dto';
import { UserStateDto } from './dto/user/user-state.dto';
import { RegisterDto } from './dto/user/register.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private httpServer: HttpServerService) { }

  public register(user: RegisterDto) {
    return this.http.post(this.httpServer.HTPP_SERVER + "/users/register", { email: user.email, password: user.password, username: user.username }, this.httpServer.headerJson())
  }

  public login(user: LoginDto) {
    return this.http.post(this.httpServer.HTPP_SERVER + "/users/login", { email: user.email, password: user.password }, this.httpServer.headerJson())
  }

  public logout() {
    return this.http.get(this.httpServer.HTPP_SERVER + "/users/logout", this.httpServer.headerJson())
  }

  public setUserToSessionStorage(userStateDto: UserStateDto) {
    sessionStorage.setItem("accessToken", userStateDto.accessToken);
    sessionStorage.setItem("user", JSON.stringify({ role: userStateDto.role, username: userStateDto.username }));
  }

  public removeUserFromSessionStorage() {
    sessionStorage.removeItem("accessToken")
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("cart")
  }

  public getUsernameFromSessionStorage() {
    const user = sessionStorage.getItem("user")
    if (!user) return null
    return JSON.parse(user).username
  }

  public getCartFromSessionStorate() {
    const cart = sessionStorage.getItem("cart")
    if (!cart) return []
    return JSON.parse(cart)
  }

}
