import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Company } from '../../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private angularFirestore: AngularFirestore) {
  }

  createCompany(company: Company) {
    const id = this.angularFirestore.createId()
    const companyRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(`companies/${id}`);
    const companyData: Company = {
      companyId: id,
      name: company.name,
      city: company.city,
      district: company.district,
      email: company.email,
      phone: company.phone,
      logoUrl: company.logoUrl
    }
    return companyRef.set(companyData, {
      merge: true
    })
  }

  getCompanies() {
    return this.angularFirestore.collection<Company>('companies').valueChanges();
  }

  getCompanyById(companyId: string) {
    return this.angularFirestore.collection<Company>('companies').doc(companyId).valueChanges();
  }

}
