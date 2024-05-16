import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CodeValidation, RegistrationCode, level, registeration } from './interfaces/RegistrationCode';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  baseUrl = 'http/sada'
  constructor(private HttpClient: HttpClient) {  }

  sendCdoe(modal : RegistrationCode):Observable<CodeValidation>{
    return this.HttpClient.post<CodeValidation>(`${this.baseUrl}/api/SecurityBMD/Users/UserLogin`,modal)
  }
  getClassesByLevel(level : string):Observable<level[]>{
    return this.HttpClient.get<level[]>(`${this.baseUrl}/${level}`)
  }
  studentRegister(modal : any):Observable<any>{
    return this.HttpClient.post(`${this.baseUrl}/ap`,modal)
  }
}
