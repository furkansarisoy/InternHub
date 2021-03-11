import { DocumentData } from "@angular/fire/firestore";

export interface Review {
    reviewId?: string;
    companyId?: string;
    uid?: string;
    title?: string;
    applyType: string;
    rate?: string;
    isPay?: boolean;
    employeeCount?: number;
    extra?: string;
    userData?: DocumentData;
}