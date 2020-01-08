import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private storage: StorageService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) { }
  setToken(token: string) {
    this.storage.set('token', token);
  }
  getToken() {
    try {
      return this.storage.get('token');
    } catch (err) {
      return null;
    }
  }
  cleanToken() {
    this.storage.remove('token');
  }
  setVerifyToken(token: string) {
    this.storage.set('verify-token', token);
  }
  getVerifyToken() {
    try {
      return this.storage.get('verify-token');
    } catch (err) {
      return null;
    }
  }

  async showLoading(message: string) {
    const loader = await this.loadingCtrl.create({
      message: message,
      duration: 2000
    });
    await loader.present();
    return loader;
  }
  /**˝
 * Toast全局提示
 */
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,  // 默认展示的时长
      position: 'top'
    });
    await toast.present();
    return toast;
  }
}
