import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyplannerComponent } from './pages/dailyplanner/dailyplanner.component';
import { ApptrackerComponent } from './pages/apptracker/apptracker.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AllcoursesComponent } from './pages/allcourses/allcourses.component';
import { MycoursesComponent } from './pages/mycourses/mycourses.component';
import { CourseComponent } from './pages/course/course.component';
import { MockComponent } from './pages/mock/mock.component';
import { ChatComponent } from './pages/chat/chat.component';
import { InternshipsComponent } from './pages/internships/internships.component';
import { CodingComponent } from './pages/coding/coding.component';
import { FulltimeComponent } from './pages/fulltime/fulltime.component';

const routes: Routes = [
  { path: 'dailyplanner', component: DailyplannerComponent },
  { path: 'apptracker', component: ApptrackerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mycourses', component: MycoursesComponent },
  { path: 'allcourses', component: AllcoursesComponent },
  { path: 'course', component: CourseComponent },
  { path: 'mock', component: MockComponent },
  { path: 'chat', component: ChatComponent},
  { path: 'internships', component: InternshipsComponent},
  { path: 'fulltime', component: FulltimeComponent},
  { path: 'coding', component: CodingComponent},
  { path: '**', redirectTo: 'apptracker' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
