import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiGatewayUrl = environment.apiGatewayUrl;

  private userControllerPath = '/users';

  constructor(private http: HttpClient) {}

  getUserById(userId: number): Observable<UserI> {
    return this.http.get<UserI>(`${this.apiGatewayUrl}${this.userControllerPath}/${userId}`);
  }

  updateUser(userId: number, user: Partial<UserI>): Observable<UserI> {
    return this.http.put<UserI>(`${this.apiGatewayUrl}${this.userControllerPath}/${userId}`, user);
  }

}

export interface UserI {
  id: number;
  username: string;
  email: string;
  role: string;
  firstname: string;
  lastname: string;
  phone: string;
}
