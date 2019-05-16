import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSliderModule,
  MatSelectModule,
  MatCardModule,
  MatTabsModule,
} from '@angular/material';
import { HomeComponent } from './_components/home/home.component';
import { TaskComponent } from './_components/task/task.component';
import { TaskFormComponent } from './_components/task/task-form/task-form.component';
import {RouterModule, Routes} from '@angular/router';
import { AuthComponent } from './_components/auth/auth.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AuthFormComponent } from './_components/auth/auth-form/auth-form.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {CountdownTimerModule} from 'ngx-countdown-timer';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './_providers/auth.service';
import {TaskService} from './_providers/task.service';
import {AuthGuard} from "./_providers/auth.guard";

const appRoutes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: '', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '', canActivate: [AuthGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskComponent,
    TaskFormComponent,
    AuthComponent,
    AuthFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatIconModule,
    ReactiveFormsModule,
    DragDropModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CountdownTimerModule.forRoot(),
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSliderModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSidenavModule
  ],
  providers: [
    AuthService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
