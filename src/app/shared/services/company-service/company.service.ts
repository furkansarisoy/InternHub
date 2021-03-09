import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Company } from '../../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private angularFirestore: AngularFirestore) {
  }

  getCompanies() {
    return this.angularFirestore.collection<Company>('companies').valueChanges();
  }

  getCompanyById(companyId: string) {
    return this.angularFirestore.collection<Company>('companies').doc(companyId).valueChanges();
  }

}
