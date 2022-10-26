import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IExcercise } from '../../interfaces/interfaces';

@Component({
  selector: 'app-excercise',
  templateUrl: './excercise.component.html',
  styleUrls: ['./excercise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExcerciseComponent {

  @Input() excercise!: IExcercise;

  constructor(private _router: Router) {}

  editExcercise() {
    this._router.navigate([`/edit-excercise/${this.excercise.id}`])
  }
}
