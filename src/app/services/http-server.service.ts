import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpServerService {

  public HTPP_SERVER = "http://localhost:3000";

  public httpOptions = {
    headers: new HttpHeaders({
      'Authorization': ''
    })
  };

  constructor() {
    // Trong constructor, lấy giá trị từ sessionStorage
    const accessToken = sessionStorage.getItem('accessToken');

    // Nếu tồn tại accessToken, cập nhật giá trị trong httpOptions
    if (accessToken) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  // Phương thức gửi yêu cầu với formData
  public headerFormData() {
    const options = {
      ...this.httpOptions,
      headers: this.httpOptions.headers.set('Content-Type', 'multipart/form-data')
    };
    return options
  }

  // Phương thức gửi yêu cầu với JSON
  public headerJson() {
    const options = {
      ...this.httpOptions,
      headers: this.httpOptions.headers.set('Content-Type', 'application/json')
    };
    return options
  }
}
