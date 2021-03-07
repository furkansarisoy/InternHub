import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Company } from '../../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  companies: Observable<Company[]>;

  constructor(private angularFirestore: AngularFirestore) {
    this.companies = this.angularFirestore.collection<Company>('companies').valueChanges();
  }

  getCompanies() {
    return this.companies;
  }

}
