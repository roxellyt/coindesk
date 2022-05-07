import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'
import { interval } from 'rxjs/observable/interval';
import { take } from 'rxjs/operators';


@Injectable()
export class CountdownTimerService {

  constructor() { }
  startTotal = 10;
  timerList: any[] = [];
  timeNowInMinutes;
  timer = {
    id: this.genId(),
    timer$: null,
    total: 300,
    resume$: new Subject()
  };
  newtotal = 300;
  test() {
    Observable.interval(100).pipe(
      take(this.newtotal),
    ).map(v=> this.newtotal - (v))
      .subscribe((v) => {
        this.timeNowInMinutes = Math.floor(v / 600) % 60 + ":" +  Math.floor((v/10)%60) + ":" + Math.floor(v % 10);
        console.log("v: ", v);
      },
      (err) => console.log(err),
      () => console.log("finish"));
  }

  genId() {
    return this.timerList.length + 1;
  }

  getTimer(id) {
    return this.timerList.filter(timer => timer.id === id)[0];
  }

  newTimer(current?) {
    let source = Observable.interval(100);
    let timer = Object.assign({}, this.timer);

    if (!current) {
      timer.timer$ = timer.resume$.switchMap(
        resume => (resume ? source : Observable.empty())
      );
      this.timerList.push(timer);
    } else {
      timer.id = current.id;
      timer.resume$ = new Subject();
      timer.timer$ = timer.resume$.switchMap(
        resume => (resume ? source : Observable.empty())
      );
      let backup = Object.assign({}, timer);
      this.timerList.splice(this.timerList.findIndex(t => t.id === current.id));
      this.timerList.push(backup);
    }

  }


  startTimer(id) {
    let timer = this.getTimer(id);
    timer.timer$
      .pipe(
      take(timer.total),
    ).map(v=> this.newtotal - (v))
      .subscribe((v) => {
        this.timeNowInMinutes = Math.floor(v / 600) % 60 + ":" +  Math.floor((v/10)%60) + ":" + Math.floor(v % 10);
        console.log("v: ", v);
      },
      (err) => console.log(err),
      () => console.log("finish"));

    timer.resume$.next(true);
  }

  pauseTimer(id) {
    this.getTimer(id).resume$.next(false);
  }

  resumeTimer(id) {
    this.getTimer(id).resume$.next(true);
  }

  resetTimer(id) {
    this.getTimer(id).resume$.complete();
    //this.getTimer(id).timer$.unsubscribe();
    let timer = this.getTimer(id);
    this.newTimer(timer);
  }
  stopTimer(id) {
    this.getTimer(id).resume$.next(false);
    this.resetTimer(id);
  }


}