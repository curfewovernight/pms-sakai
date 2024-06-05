import { Injectable } from '@angular/core';
import { Case } from './case';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  constructor() {}

  caseList: Case[] = [];

  url1 = 'http://localhost:3000/cases';

  async getAllCases(): Promise<Case[]> {
    const data = await fetch(this.url1);

    const data1 = await data.json().then((x) =>
      x.map((obj: Case) => {
        return { ...obj, date: new Date(obj.date) };
      })
    );

    return data1 ?? [];
  }

  async getCaseById(id: number): Promise<Case | undefined> {
    const data = await fetch(`${this.url1}/${id}`);
    return (await data.json()) ?? {};
  }
}
