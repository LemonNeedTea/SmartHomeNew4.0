import { Injectable } from '@angular/core';
import axios from 'axios';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    axios.defaults.baseURL = 'http://localhost:8888';
    axios.interceptors.request.use(
      config => {
        console.log(config);
        return config;
      },
      error => {
        // 请求失败处理
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      response => {

        return response.data.data;
      },
      error => {
        // 请求失败处理
        return Promise.reject(error);
      }
    );
  }

  async get(url: string, isLoading = true) {
    return axios.get(url);
  }
  // 添加响应拦截器

}
