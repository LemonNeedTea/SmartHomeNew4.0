import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { LoadingController, ToastController } from '@ionic/angular';
import { BaseUI } from '../../common/baseui';
import { ToolsService } from './tools.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AxiosService extends BaseUI {

  isLoading = true;
  loader: any;
  constructor(private tools: ToolsService,
    private loading: LoadingController,
    private toastCtrl: ToastController,
    private router: Router) {
    super();
    axios.defaults.baseURL = 'http://localhost:8888';
    // 添加响应拦截器
    axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        // 1.是否加载loading动画
        if (this.isLoading) {
          super.showLoading(this.loading, 'Please wait...');
        }
        config.headers['Accept'] = '*/*';
        config.headers['Content-Type'] = 'application/json';

        const token = this.tools.getToken();
        if (token) {
          config.headers.token = token;
        }
        return config;
      },
      async error => {
        // 请求失败处理
        this.loading.dismiss();
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      async response => {

        this.loading.dismiss();
        const tempData = response.data;
        if (tempData.success) {
          return tempData.data;
        } else {
          // 失败
          super.showToast(this.toastCtrl, tempData['msg']);
          if (tempData.code === 5104) {// token失效
            // 1.清除token
            this.tools.cleanToken();
            // 2.弹出确认返回登录框
            this.router.navigateByUrl('/login');

          }
          console.error(tempData);
          return Promise.reject(tempData);
        }
        return response.data;
      },
      async error => {
        // 请求失败处理
        this.loading.dismiss();
        return Promise.reject(error);
      }
    );
  }

  async get(url: string, params: any, isLoading = true) {
    this.isLoading = isLoading;
    return axios.get(url, params);
  }
  async post(url: string, params: any, isLoading = true) {
    this.isLoading = isLoading;
    return axios.post(url, params);
  }

}
