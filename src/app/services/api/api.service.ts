import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import { IExcercise, Joint, Signal, Tool } from '../../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = `${env.apiURL}${env.api_env}`;
  headersXHR = {
    method: "GET",
    headers: {
      'Accept': 'application/json',
    },
  };

  constructor(private _http: HttpClient) {}

  async joints() {
    return this.fetch(`${this.apiURL}joints`);
    // return this._http.get(`${this.apiURL}joints`, {observe: 'body'});
  }

  async tools(): Promise<Tool[]> {
    return this.fetch(`${this.apiURL}tools`);
    // return this.request(`${this.apiURL}tools`);
  }

  async signals(): Promise<Signal[]> {
    return this.fetch(`${this.apiURL}signals`);
    // return this.request(`${this.apiURL}signals`);
  }

  async exercises(): Promise<IExcercise[]>{
    return this.fetch(`${this.apiURL}exercises`);
    // return this.request(`${this.apiURL}exercises`);
  }

  async getExcerciseById(id: string): Promise<IExcercise>{
    return await fetch(`${this.apiURL}exercises/${id}`, this.headersXHR)
    .then((res) => res.json());
    // return this.request(`${this.apiURL}exercises`);
  }

  private async fetch(url: string): Promise<IExcercise[]> {
    return await fetch(url, this.headersXHR)
                  .then((res) => res.json()
                  .then((res) => Object.values(res)));
  }

  // private request(url: string): Observable<IExcercise[]> {
  //   return this._http.get<IExcercise[]>(url, {observe: 'body'}).pipe(
  //     map(item => Object.values(item))
  //   );
  // }
}
