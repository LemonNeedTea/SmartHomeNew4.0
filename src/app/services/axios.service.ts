import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';
import { async } from 'rxjs/internal/scheduler/async';
import Qs from 'qs';
import { ToolsService } from './tools.service';


@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor(private tools: ToolsService) {
    axios.defaults.baseURL = 'http://localhost:8888';
    // 添加响应拦截器
    axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        config.headers['Accept'] = '*/*';
        config.headers['Content-Type'] = 'application/json';

        const token = this.tools.getToken();
        if (token) {
          config.headers.token = token;
        }
        return config;
      },
      error => {
        // 请求失败处理
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      response => {
        const tempData = response.data;
        if (tempData.success) {
          return tempData.data;
        } else {
          // 失败
          console.error(tempData);
          return Promise.reject(tempData);
        }
        return response.data;
      },
      error => {
        // 请求失败处理
        return Promise.reject(error);
      }
    );
  }

  async get(url: string, params: any, isLoading = true) {
    return axios.get(url, params);
  }
  async post(url: string, params: any, isLoading = true) {
    return axios.post(url, params);
  }

}
