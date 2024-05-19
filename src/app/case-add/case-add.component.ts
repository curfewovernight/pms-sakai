import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-case-add',
  standalone: true,
  imports: [
    FormsModule,
    CalendarModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    SelectButtonModule,
    InputMaskModule,
    ButtonModule,
  ],
  template: `
    <div class="card">
      <h5>New Case</h5>
      <p>Add a new case</p>
      <div class="mt-3 p-fluid p-formgrid grid">
        <div class="field col-12 md:col-6">
          <label htmlFor="firstname">First Name</label>
          <input pInputText id="firstname" type="text" />
        </div>
        <div class="field col-12 md:col-6">
          <label htmlFor="lastname">Last Name</label>
          <input pInputText id="lastname" type="text" />
        </div>
        <div class="field col-12 md:col-3">
          <label htmlFor="casedate">Date</label>
          <p-calendar
            [showIcon]="true"
            dateFormat="d-mm-yy"
            iconDisplay="input"
            id="casedate"
          />
        </div>
        <div class="field col-12 md:col-3">
          <label htmlFor="casedate">Reg No.</label>
          <input pInputText id="casedate" type="text" />
        </div>
        <div class="field col-12 md:col-3">
          <label htmlFor="age">Age</label>
          <p-inputNumber
            mode="decimal"
            [showButtons]="true"
            [min]="0"
            [max]="100"
            inputId="age"
            suffix=" years old..."
          >
          </p-inputNumber>
        </div>
        <div class="field col-12 md:col-3">
          <label htmlFor="casedate">Sex</label>
          <!-- <p-dropdown
            [options]="['Male', 'Female']"
            placeholder="Select sex"
          ></p-dropdown> -->
          <p-selectButton [options]="['Male', 'Female']"></p-selectButton>
        </div>
        <div class="field col-12">
          <label htmlFor="address">Address</label>
          <textarea pInputTextarea id="address" type="text" rows="3"></textarea>
        </div>
        <div class="field col-12 md:col-3">
          <label htmlFor="occupation">Occupation</label>
          <input pInputText id="occupation" type="text" />
        </div>
        <div class="field col-12 md:col-3">
          <label htmlFor="religion">Religion</label>
          <p-dropdown
            [options]="religions"
            showClear="true"
            placeholder="Select a religion"
          ></p-dropdown>
        </div>
        <div class="field col-12 md:col-3">
          <label htmlFor="maritalstatus">Marital Status</label>
          <p-selectButton [options]="['Single', 'Married']"></p-selectButton>
        </div>
        <div class="field col-12 md:col-3">
          <label htmlFor="phone">Phone</label>
          <p-inputMask
            id="phone"
            mask="9999-999-999"
            placeholder="1234-567-890"
          />
        </div>
        <div class="field col-12">
          <label htmlFor="complaint">Complaint</label>
          <textarea
            pInputTextarea
            id="complaint"
            type="text"
            rows="3"
          ></textarea>
        </div>
        <div class="md:col-9"></div>
        <div class="col-12 md:col-3">
          <p-button (onClick)="addCase()" label="Save"></p-button>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class CaseAddComponent {
  religions: string[] = [
    'Hinduism',
    'Islam',
    'Christianity',
    'Sikhism',
    'Buddhism',
    'Jainism',
    'No religion',
    'Other',
  ];

  addCase() {
    console.log('saved');
  }
}
