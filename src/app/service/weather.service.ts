import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey="6ebbb152b8mshd12629edbeed13bp1691ecjsn1c17851d9c5d";
  private apiUrl="https://the-weather-api.p.rapidapi.com/api/weather";

  constructor(private http:HttpClient) { }

  searchWeatherByCity(city:string):Observable<any>{
    const headers = new HttpHeaders()
     .set("X-RapidAPI-Key",this.apiKey)
     .set("X-RapidAPI-Host","the-weather-api.p.rapidapi.com");

     const option={headers};

     return this.http.get(`${this.apiUrl}/${city}`,option)
  }
}
