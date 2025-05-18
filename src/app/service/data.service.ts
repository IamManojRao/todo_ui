// src/app/shared/data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private user = new BehaviorSubject<any>(null);
  currentData$ = this.user.asObservable();

  setUser(data: any) {
    this.user.next(data);
  }
}
