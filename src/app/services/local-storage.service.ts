import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  localStorage: Storage;
  value = {};

  constructor() {
    this.localStorage = window.localStorage;
  }

  setLocalstorage(key: string, value: IProduct[]) {
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalstorage(key: string): string {
    return this.localStorage.getItem(key) || '[]';
  }

  clearLocalstorage(key: string) {
    this.localStorage.removeItem(key);
  }
}
