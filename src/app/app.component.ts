import { Component, VERSION } from '@angular/core';
import { BitcoinService } from './bitcoin.service';
import { CountdownTimerService } from './countdown-timer.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  constructor(
    public bitcoinService: BitcoinService,
    public timerS: CountdownTimerService
  ) {}

  updateBitcoinRates() {
    this.bitcoinService.update();
  }
  ngOnInit() {
    this.timerS.newTimer();
    this.timerS.startTimer(1);
  }
}
