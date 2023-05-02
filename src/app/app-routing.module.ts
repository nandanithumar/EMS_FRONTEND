import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStateComponent } from './add-state/add-state.component';
import { AddTypeComponent } from './add-type/add-type.component';
import { BodyComponentComponent } from './body-component/body-component.component';
import { CareerComponentComponent } from './career-component/career-component.component';
import { ClubComponentComponent } from './club-component/club-component.component';
import { HolidayComponentComponent } from './holiday-component/holiday-component.component';
import { InfoComponentComponent } from './info-component/info-component.component';
import { LeaveStructureComponentComponent } from './leave-structure-component/leave-structure-component.component';
import { StateComponentComponent } from './state-component/state-component.component';
import { TypeComponentComponent } from './type-component/type-component.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CachingInterceptor } from './caching.interceptor';


const routes: Routes = [ 
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
  { path: 'dashboard', component:BodyComponentComponent},
  { path: 'company/info', component: InfoComponentComponent }, 
  { path: 'company/holiday', component: HolidayComponentComponent }, 
  { path: 'company/leavestructure', component: LeaveStructureComponentComponent},
  { path: 'company/career', component:CareerComponentComponent},
  { path: 'company/club', component:ClubComponentComponent},
  { path: 'master', redirectTo:'master/state',pathMatch:'full'},
  { path: 'master/state', component:StateComponentComponent},
  { path: 'master/type', component:TypeComponentComponent},
  { path: 'master/addState', component:AddStateComponent},
  { path: 'master/addType', component:AddTypeComponent}
  
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true
    }
  ]
})
export class AppRoutingModule {

 }
