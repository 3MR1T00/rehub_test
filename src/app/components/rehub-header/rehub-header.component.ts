import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rehub-header',
  templateUrl: './rehub-header.component.html',
  styleUrls: ['./rehub-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RehubHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
