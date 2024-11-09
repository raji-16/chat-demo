import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { APP_CONSTANTS } from '../shared/constants/app.constant';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  key = APP_CONSTANTS.AUTH.KEY;
  constructor() { }

  public saveData(key: string, value: string, isEncrypt = true) {
    isEncrypt ? localStorage.setItem(key, this.encrypt(value)) : 
    localStorage.setItem(key, value);
  }

  public getData(key: string, isDecrypt = true) {
    let data = localStorage.getItem(key) || "";
    return isDecrypt ? this.decrypt(data) : data ? JSON.parse(data) : '';
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}
