import { Injectable } from '@angular/core';
import { AxiosService } from '../axios.service';
import {ToolsService} from '../tools.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRequestService {

  constructor(private axiosHttp: AxiosService,
    private tools: ToolsService) { }
  /**
   * 获取登录验证码图片数据
   */
  getVerificationCode() {
    return this.axiosHttp.get('/verificationCode/getBase64Image', false);
  }
  /**
   * 登录
   * @param username 用户名
   * @param pwd 密码
   * @param code 验证码
   */
  login(username: string, pwd: string, code: string) {
    return this.axiosHttp.post('/login', {
      'code': code,
      'password': pwd,
      'username': username
    }).then((res: any) => {
      // 成功保存token
      this.tools.setToken(res.token);
    }).catch(err => {
      alert(err) ;
    });
  }
}
