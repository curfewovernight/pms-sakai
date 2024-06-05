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
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';

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
    DropdownModule,
    TagModule,
    DialogModule,
  ],
  template: `
    <div class="card">
      <h5 class="mb-5">Cases</h5>
      <p-table
        #dt
        [value]="caseList"
        [tableStyle]="{ 'min-width': '190rem' }"
        styleClass="p-datatable-sm"
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
            <span class="p-input-icon-right ml-auto">
              <input
                type="text"
                pInputText
                (input)="applyFilterGlobal($event, 'contains')"
                placeholder="Search"
              />
              <i class="pi pi-search"></i>
            </span>
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
          <tr>
            <th>
              <p-columnFilter
                type="text"
                field="firstName"
                placeholder="Search"
                ariaLabel="Filter Name"
              />
            </th>
            <th>
              <p-columnFilter
                type="text"
                field="date"
                placeholder="Search"
                ariaLabel="Filter Date"
              />
            </th>
            <th>
              <p-columnFilter
                type="text"
                field="regNo"
                placeholder="Search"
                ariaLabel="Filter Reg No."
              />
            </th>
            <th>
              <p-columnFilter
                type="text"
                field="age"
                placeholder="Search"
                ariaLabel="Filter age"
              />
            </th>
            <th>
              <!-- <p-columnFilter
                type="text"
                field="sex"
                placeholder="Search"
                ariaLabel="Filter sex"
              /> -->
              <p-columnFilter
                field="status"
                matchMode="equals"
                [showMenu]="false"
              >
                <ng-template
                  pTemplate="filter"
                  let-value
                  let-filter="filterCallback"
                >
                  <p-dropdown
                    [options]="['Male', 'Female']"
                    (onChange)="filter($event.value)"
                    placeholder="Any"
                    [showClear]="true"
                  >
                    <!-- <ng-template let-option pTemplate="item">
                      <p-tag [value]="option.value" />
                    </ng-template> -->
                  </p-dropdown>
                </ng-template>
              </p-columnFilter>
            </th>
            <th>
              <p-columnFilter
                type="text"
                field="address"
                placeholder="Search"
                ariaLabel="Filter address"
              />
            </th>
            <th>
              <p-columnFilter
                type="text"
                field="occupation"
                placeholder="Search"
                ariaLabel="Filter occupation"
              />
            </th>
            <th>
              <p-columnFilter
                type="text"
                field="religion"
                placeholder="Search"
                ariaLabel="Filter religion"
              />
            </th>
            <th>
              <p-columnFilter
                type="text"
                field="maritalStatus"
                placeholder="Search Status"
                ariaLabel="Filter Marital Status"
              />
            </th>
            <th>
              <p-columnFilter
                type="text"
                field="phone"
                placeholder="Search"
                ariaLabel="Filter Phone"
              />
            </th>
            <th>
              <p-columnFilter
                type="text"
                field="complaint"
                placeholder="Search"
                ariaLabel="Filter Complaint"
              />
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
            <td
              p-button
              type="button"
              class="p-element p-ripple p-button-text p-button-plain p-button p-component m-2 p-1"
              (click)="showComplaint(case.id)"
            >
              <span class="p-button-label">{{
                case.complaint.slice(0, 40) + '...'
              }}</span>
            </td>
            <p-dialog
              [(visible)]="visible"
              [modal]="true"
              showEffect="fade"
              [style]="{ width: '30vw' }"
              [breakpoints]="{ '960px': '75vw' }"
            >
              <p class="line-height-3 m-0">
                {{ tempComplaint1 }}
              </p>
            </p-dialog>
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
    this.caseService.getAllCases().then((caseList: Case[]) => {
      this.caseList = caseList;
      this.initialValue = [...caseList];
    });
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

  visible: boolean = false;

  tempComplaint: Case | undefined;

  tempComplaint1 = '';

  // TODO: ADD PARAMETER TO TAKE CASE ID AND STORE COMPLAINT IN VARIABLE, SHOW IT IN A DIALOG
  showComplaint(id: number) {
    this.caseService.getCaseById(id).then((case1: Case | undefined) => {
      this.tempComplaint = case1;
    });

    if (this.tempComplaint !== undefined) {
      console.log(this.tempComplaint.complaint);
      console.log(this.tempComplaint);
    }

    this.tempComplaint1 = this.tempComplaint?.complaint ?? '';
    this.visible = true;
  }
}
