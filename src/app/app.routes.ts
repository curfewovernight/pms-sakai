import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { PatientRecordsComponent } from './patient-records/patient-records.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CaseRecordsComponent } from './case-records/case-records.component';
import { CaseAddComponent } from './case-add/case-add.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    title: 'Dashboard',
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'patient',
        component: PatientRecordsComponent,
        title: 'Patients',
      },
      {
        path: 'patient/add',
        component: PatientAddComponent,
        title: 'Add Patient',
      },
      {
        path: 'case',
        component: CaseRecordsComponent,
        title: 'Cases',
      },
      {
        path: 'case/add',
        component: CaseAddComponent,
        title: 'Add Case',
      },
    ],
  },
];
