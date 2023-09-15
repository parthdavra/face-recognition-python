import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

    getValue(key: any): any {
        return localStorage.getItem(key);
    }

    setValue(key: any, value: any): void {
        localStorage.setItem(key, value);
    }

    removeValue(key: any): void {
        localStorage.removeItem(key);
    }
}

export class StorageKey {


}

