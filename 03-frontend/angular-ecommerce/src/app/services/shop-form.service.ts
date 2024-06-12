import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  private countriesUrl = environment.shopApiUrl + "/countries"
  private statesUrl = environment.shopApiUrl + "/states"

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    )
  }

  getStates(theCountryCode: string): Observable<State[]>{
    // search URL
    const searchUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`
    return this.httpClient.get<GetResponseState>(searchUrl).pipe(
      map(response => response._embedded.states)
    )
  }


  getCreditCardMonths(startMonth: number): Observable<number[]>{

    let data: number[] = [];

    // build an array for "Month" dropdown list
    // — start at current nonth and loop until

    for(let theMonth = startMonth; theMonth <=12; theMonth++ ){
      data.push(theMonth)
    }
    return of(data)
  }

  getCreditCardYears(): Observable<number[]>{
    let data: number[] = [];

    // build an array for "Year" dropdown list
    // — start at current year and loop for next 10 years
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for(let theyear = startYear; theyear <= endYear; theyear++){
      data.push(theyear)
    }
    return of(data)
  }

}

interface GetResponseCountries{
  _embedded:{
    countries: Country[]
  }
}
interface GetResponseState{
  _embedded:{
    states: State[]
  }
}
