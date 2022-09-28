import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DailyplannerComponent } from './pages/dailyplanner/dailyplanner.component';
import { ApptrackerComponent } from './pages/apptracker/apptracker.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AllcoursesComponent } from './pages/allcourses/allcourses.component';
import { MycoursesComponent } from './pages/mycourses/mycourses.component';
import { CourseComponent } from './pages/course/course.component';
import { MockComponent } from './pages/mock/mock.component';

import { SafePipe } from './safe.pipe';
import { ChatComponent } from './pages/chat/chat.component';
import { ContactComponent } from './pages/contact/contact.component';
import { InternshipsComponent } from './pages/internships/internships.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { CodingComponent } from './pages/coding/coding.component';
import { FulltimeComponent } from './pages/fulltime/fulltime.component'; // a plugin!

registerLocaleData(en);
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    DailyplannerComponent,
    ApptrackerComponent,
    LoginComponent,
    RegisterComponent,
    AllcoursesComponent,
    MycoursesComponent,
    CourseComponent,
    MockComponent,
    SafePipe,
    ChatComponent,
    ContactComponent,
    InternshipsComponent,
    CodingComponent,
    FulltimeComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzEmptyModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzTableModule,
    NzPopoverModule,
    NzAlertModule,
    NzNotificationModule,
    NzCardModule,
    NzSpinModule,
    NzModalModule,
    NzPageHeaderModule,
    NzDrawerModule,
    NzCollapseModule,
    NzSelectModule,
    FullCalendarModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
