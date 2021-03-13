import { DocumentData } from "@angular/fire/firestore";

export interface Review {
    reviewId?: string;
    companyData?: DocumentData;
    uid?: string;
    title?: string;
    applyType: string;
    rate?: string;
    isPay?: boolean;
    employeeCount?: number;
    extra?: string;
    userData?: DocumentData;
}