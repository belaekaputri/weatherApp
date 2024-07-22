import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from './service/weather.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('myModal') model: ElementRef | undefined;
  cityObj: City = new City();
  cityList: City[] = [];
     searchForm! : FormGroup;
     weather : any;
     constructor(private fb:FormBuilder,
           private service:WeatherService
     ){}

     ngOnInit(){
      this.searchForm = this.fb.group({
        city: [null,Validators.required]
      })
      const localData = localStorage.getItem("weather");
      if(localData != null) {
      this.cityList = JSON.parse(localData)
    }
     }

     openModel() {
    
      const model = document.getElementById("myModal");
      if (model != null) {
        model.style.display = 'block'
      }
    }
    closeModel() {
      this.cityObj = new City();
      if (this.model != null) {
        this.model.nativeElement.style.display = 'none';
      }
    }


    saveCity() {
    const isLocalPresent = localStorage.getItem("weather");
    if (isLocalPresent != null) {
      
      const oldArray = JSON.parse(isLocalPresent);
      this.cityObj.id = oldArray.length + 1;
      oldArray.push(this.cityObj);
      this.cityList = oldArray;
      localStorage.setItem('weather', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.cityObj);
      this.cityObj.id = 1;
      this.cityList = newArr;
      localStorage.setItem('weather', JSON.stringify(newArr));
    }
    this.closeModel()
  }

     searchWeather(){
      console.log(this.searchForm.value);
      this.service.searchWeatherByCity(this.searchForm.get(['city'])!.value).subscribe((resp) => {
        console.log(resp);
        this.weather = resp.data;
       
      })
}}

export class City {
  id: number;
  city: string;
  suhu: string;
  kondisi: string;
  kelembapan: string;

  constructor() {
    this.id = 0;
    this.city= '';
    this.suhu = '';
    this.kondisi = '';
    this.kelembapan = '';
  }

}