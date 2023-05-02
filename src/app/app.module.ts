import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';


import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalenderComponentComponent } from './calender-component/calender-component.component';
import { InfoComponentComponent } from './info-component/info-component.component';
import { HolidayComponentComponent } from './holiday-component/holiday-component.component';
import { LeaveStructureComponentComponent } from './leave-structure-component/leave-structure-component.component';
import { CareerComponentComponent } from './career-component/career-component.component';
import { ClubComponentComponent } from './club-component/club-component.component';
import { BodyComponentComponent } from './body-component/body-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { StateComponentComponent } from './state-component/state-component.component';
import { TypeComponentComponent } from './type-component/type-component.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStateComponent } from './add-state/add-state.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddTypeComponent } from './add-type/add-type.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponentComponent,
    CalenderComponentComponent,
    InfoComponentComponent,
    HolidayComponentComponent,
    LeaveStructureComponentComponent,
    CareerComponentComponent,
    ClubComponentComponent,
    BodyComponentComponent,
    FooterComponentComponent,
    StateComponentComponent,
    TypeComponentComponent,
    AddStateComponent,
    AddTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
