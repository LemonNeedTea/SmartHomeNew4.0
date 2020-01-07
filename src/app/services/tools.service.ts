import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private storage: StorageService) { }
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
}
