import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'fin-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
