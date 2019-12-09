import { Component, OnInit } from '@angular/core';
import { HabitStatisticService } from 'src/app/service/habit-statistic/habit-statistic.service';

@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.css'],
})
export class UserLogComponent implements OnInit {

  constructor(private habitStatisticService: HabitStatisticService) { }

  readonly package = 'assets/img/icon/package_statistic.png';
  readonly coffee = 'assets/img/icon/coffee_statistic.png';

  hasStatistic = false;

  $userLog: any;
  $creationDate: Date;
  $amountUnTakenItemsPerMonthBag: number;
  $amountUnTakenItemsPerMonthCap: number;
  $differenceUnTakenItemsWithPreviousDayBag: number;
  $differenceUnTakenItemsWithPreviousDayCap: number;

  ngOnInit() {
    this.$userLog = this.habitStatisticService.getUserLog().subscribe(data => {
      this.hasStatistic = true;
      this.$creationDate = data.creationDate;
      if (data.allItemsPerMonth[1] !== undefined) {
        this.$amountUnTakenItemsPerMonthCap = data.allItemsPerMonth[1].habitItemAmount;
      }
      if (data.allItemsPerMonth[0] !== undefined) {
        this.$amountUnTakenItemsPerMonthBag = data.allItemsPerMonth[0].habitItemAmount;
      }
      if (data.differenceUnTakenItemsWithPreviousDay[1] !== undefined) {
        this.$differenceUnTakenItemsWithPreviousDayCap = data.differenceUnTakenItemsWithPreviousDay[1].habitItemAmount;
      }
      if (data.differenceUnTakenItemsWithPreviousDay[0] !== undefined) {
        this.$differenceUnTakenItemsWithPreviousDayBag = data.differenceUnTakenItemsWithPreviousDay[0].habitItemAmount;
      }
    }, error => {
      this.hasStatistic = false;
      console.log('Error!', error);
    }
    );
  }

  nowDate() {
    const date: Date = new Date();
    return date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' });
  }

  countDay() {
    const date: Date = new Date();
    return date.getDate();
  }

  checkCountForMonth(countHabit: number) {
    return Math.abs(countHabit);
  }

  countDayInCycle() {
    const dateNow = new Date();
    const dateFromDateBase = new Date(this.$creationDate);
    const DifferenceInTime = dateNow.getTime() - dateFromDateBase.getTime();
    const DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);
    return Math.floor(DifferenceInDays) > 1 ? Math.floor(DifferenceInDays) : 1;
  }

}