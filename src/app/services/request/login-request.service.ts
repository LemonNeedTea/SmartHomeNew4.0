import { Injectable } from '@angular/core';
import { AxiosService } from '../axios.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRequestService {

  constructor(private axiosHttp: AxiosService) { }
  /**
   * 获取登录验证码图片数据
   */
  getVerificationCode() {
    return this.axiosHttp.get('/verificationCode/getBase64Image', false);
  }
}
