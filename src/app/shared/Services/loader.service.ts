import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(){}
  loadingStatus: Subject<boolean> = new Subject<boolean>();

  show(): void {
    this.loadingStatus.next(true);
  }

  hide(): void {
    this.loadingStatus.next(false);
  }

  getLoadingStatus(): Observable<boolean> {
    return this.loadingStatus.asObservable();
  }
}
