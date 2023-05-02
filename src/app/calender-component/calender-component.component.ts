  import { Component } from '@angular/core';
  import { CalendarMonthViewDay, CalendarView } from 'angular-calendar';


  @Component({
    selector: 'app-calender-component',
    templateUrl: './calender-component.component.html',
    styleUrls: ['./calender-component.component.css'],
  })
  export class CalenderComponentComponent {
    nationalholidays: Date[] = [
      new Date('2023-01-01'), // New Year's Day
      new Date('2023-01-16'), // Martin Luther King Jr. Day
      new Date('2023-02-20'), // Presidents' Day
      new Date('2023-05-29'), // Memorial Day
      new Date('2023-07-04'), // Independence Day
      new Date('2023-09-04'), // Labor Day
      new Date('2023-10-09'), // Columbus Day
      new Date('2023-11-11'), // Veterans Day
      new Date('2023-11-23'), // Thanksgiving Day
      new Date('2023-12-25'), // Christmas Day
    ];

    viewDate: Date = new Date();
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;

    setView(view: CalendarView) {
      this.view = view;
    }
    

    getCurrentYear(): number {
      return this.viewDate.getFullYear();
    }

    getCurrentMonth(): string {
      return this.viewDate.toLocaleString('default', { month: 'long' });
    }

    isNationalHoliday(targetDate: Date): boolean {
      const date = targetDate.getDate();
      return this.nationalholidays.some(holiday => holiday.toDateString() === targetDate.toDateString()) ? true : false;
    }    
    
    cellModifier = (cell: CalendarMonthViewDay) => {
      if (this.isNationalHoliday(cell.date)) {
        cell.cssClass = 'national-holiday';
      }
      return cell;
    }
    
    
  }
