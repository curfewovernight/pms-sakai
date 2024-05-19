import { Component, ViewChild, inject } from '@angular/core';
import { CaseService } from '../case.service';
import { Case } from '../case';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SortEvent } from 'primeng/api';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-case-records',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
  ],
  template: `
    <div class="card">
      <h5 class="mb-5">Cases</h5>
      <p-table
        #dt
        [value]="caseList"
        [tableStyle]="{ 'min-width': '110rem' }"
        styleClass="p-datatable-lg"
        [paginator]="true"
        [rows]="5"
        [rowsPerPageOptions]="[5, 10, 20, 30]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        [showCurrentPageReport]="true"
        (sortFunction)="customSort($event)"
        [customSort]="true"
        dataKey="id"
        [loading]="loading"
        [globalFilterFields]="['firstName', 'lastName', 'phone']"
      >
        <ng-template pTemplate="caption">
          <div class="flex">
            <p-iconField iconPosition="left" class="ml-auto">
              <p-inputIcon>
                <i class="pi pi-search"></i>
              </p-inputIcon>
              <input
                pInputText
                type="text"
                (input)="applyFilterGlobal($event, 'contains')"
                placeholder="Search keyword"
              />
            </p-iconField>
          </div>
        </ng-template>
        <ng-template pTemplate="header"
          ><tr>
            <th pSortableColumn="firstName">
              Name <p-sortIcon field="firstName"></p-sortIcon>
            </th>
            <th pSortableColumn="date">
              Date <p-sortIcon field="date"></p-sortIcon>
            </th>
            <th pSortableColumn="regNo">
              Reg No. <p-sortIcon field="regNo"></p-sortIcon>
            </th>
            <th pSortableColumn="age">
              Age <p-sortIcon field="age"></p-sortIcon>
            </th>
            <th pSortableColumn="sex">
              Sex <p-sortIcon field="sex"></p-sortIcon>
            </th>
            <th pSortableColumn="address">
              Address <p-sortIcon field="address"></p-sortIcon>
            </th>
            <th pSortableColumn="occupation">
              Occupation <p-sortIcon field="occupation"></p-sortIcon>
            </th>
            <th pSortableColumn="religion">
              Religion <p-sortIcon field="religion"></p-sortIcon>
            </th>
            <th pSortableColumn="marital">
              Marital Status <p-sortIcon field="marital"></p-sortIcon>
            </th>
            <th pSortableColumn="phone">
              Phone <p-sortIcon field="phone"></p-sortIcon>
            </th>
            <th pSortableColumn="complaint">
              Complaint <p-sortIcon field="complaint"></p-sortIcon>
            </th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-case>
          <tr>
            <td>{{ case.firstName }} {{ case.lastName }}</td>
            <td>
              {{ case.date.toLocaleDateString('en-GB').replaceAll('/', '-') }}
            </td>
            <td>{{ case.regNo }}</td>
            <td>{{ case.age }}</td>
            <td>{{ case.sex }}</td>
            <td>{{ case.address }}</td>
            <td>{{ case.occupation }}</td>
            <td>{{ case.religion }}</td>
            <td>{{ case.maritalStatus }}</td>
            <td>{{ case.phone }}</td>
            <td>{{ case.complaint }}</td>
          </tr>
        </ng-template>
        <ng-template pTemplate="paginatorleft"></ng-template>
      </p-table>
    </div>
  `,
  styles: ``,
})
export class CaseRecordsComponent {
  @ViewChild('dt') dt!: Table;

  caseList: Case[] = [];

  initialValue: Case[] = [];

  isSorted: boolean | null = null;

  loading: boolean = true;

  caseService: CaseService = inject(CaseService);

  constructor() {
    this.caseList = this.caseService.getAllCases();
    this.initialValue = [...this.caseList];
    this.loading = false;
  }

  // FOR REMOVABLE SORTING
  // DOESN'T WORK WITH MULTIPLE SORT MODE BECAUSE OF DIFFERENT ARRAY STRUCTURE
  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted == false) {
      this.isSorted = null;
      this.caseList = [...this.initialValue];
      this.dt.reset();
    }
  }

  // TODO: NEED TO UNDERSTAND THIS
  sortTableData(event: any) {
    event.data.sort((data1: any, data2: any) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
