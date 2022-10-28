import { Injectable } from '@angular/core';
import { IExcercise, Joint, Signal, Tool } from 'src/app/interfaces/interfaces';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ExcerciseService {

  constructor(private _api: ApiService) { }

  getTools(): Promise<Tool[]> {
    return this._api.tools();
  }

  getSignals(): Promise<Signal[]> {
    return this._api.signals();
  }
  
  getJoints(): Promise<Joint[]> {
    return this._api.joints();
  }

  getExcercise(): Promise<IExcercise[]> {
    return this._api.exercises();
  }

  getExcerciseById(id: string): Promise<IExcercise> {
    return this._api.getExcerciseById(id);
  }

  setExcerciseById(excercise: IExcercise): Promise<IExcercise> {
    return this._api.setExcerciseById(excercise);
  }
 
}
