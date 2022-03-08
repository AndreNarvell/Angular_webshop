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

  //Setting localStorage
  setLocalstorage(key: string, value: IProduct[]) {
    this.localStorage.setItem(key, JSON.stringify(value));
  }

  //Getting localStorage
  getLocalstorage(key: string): string {
    return this.localStorage.getItem(key) || '[]';
  }

  //Clearing localStorage
  clearLocalstorage(key: string) {
    this.localStorage.removeItem(key);
  }
}
