import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Company } from 'src/app/shared/interfaces/company.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth-service/auth.service';
import { CompanyService } from 'src/app/shared/services/company-service/company.service';



@Component({
  selector: 'internhub-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  searchValue: string = "";
  results: any;
  companies: Company[];
  subscription: Subscription;

  constructor(private companyService: CompanyService, private angularFirestore: AngularFirestore) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.companyService.getCompanies().subscribe(company => {
      this.companies = company;
    });
  }

  search() {
    this.results = this.angularFirestore.collection(`companies`, ref => ref
      .orderBy("name")
      .startAt(this.searchValue.toLocaleLowerCase())
      .endAt(this.searchValue.toLocaleLowerCase() + "\uf8ff")
      .limit(10))
      .valueChanges();
  }
}
