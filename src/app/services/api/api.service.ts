import { Injectable } from '@angular/core';
import { environment as env} from 'src/environments/environment';
import { IExcercise, Joint, Signal, Tool } from '../../interfaces/interfaces';
import config  from '../../../assets/json/config.json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = `${env.apiURL}${env.api_env}`;
 
  constructor() {}

  async joints(): Promise<Joint[]> {
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

  async exercises(): Promise<IExcercise[]> {
    return this.fetch(`${this.apiURL}exercises`);
    // return this.request(`${this.apiURL}exercises`);
  }

  async getExcerciseById(id: string): Promise<IExcercise> {
    return await fetch(`${this.apiURL}exercises/${id}`, config.getHeadersXHR)
    .then((res) => res.json());
    // return this.request(`${this.apiURL}exercises/${id}`);
  }

  async setExcerciseById(excercise: IExcercise): Promise<IExcercise> {
    return await fetch(`${this.apiURL}execises/${excercise.id}`, {
      method: "POST",
      body: JSON.stringify(excercise)
    }).then(res => res.json());
  }

  private async fetch(url: string): Promise<IExcercise[]> {
    return await fetch(url, config.getHeadersXHR)
                  .then((res) => res.json()
                  .then((res) => Object.values(res)));
  }

  // private request(url: string): Observable<IExcercise[]> {
  //   return this._http.get<IExcercise[]>(url, {observe: 'body'}).pipe(
  //     map(item => Object.values(item))
  //   );
  // }
}
