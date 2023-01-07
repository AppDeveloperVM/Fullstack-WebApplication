import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TarjetaCredito } from '../models/tarjetaCredito';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  myAppUrl = 'https://localhost:44361/';
  myApiUrl = 'api/TarjetaCredito/';
  list: TarjetaCredito[] = [];

  constructor(private http: HttpClient) { }

  guardarTarjeta(tarjeta: TarjetaCredito): Observable<TarjetaCredito> {
    return this.http.post<TarjetaCredito>(this.myAppUrl + this.myApiUrl, tarjeta);
  }

  obtenerTarjetas(){
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise()
    .then(data => {
      this.list = data as TarjetaCredito[];
    })
  }
}
