import { DocumentData, DocumentReference } from "@angular/fire/firestore";
import { User } from "./user.interface";

export interface Review {
    companyId: string;
    uid: DocumentReference;
    title: string;
    rate: string;
    q1: string;
    q2: string;
    q3: boolean;
    q4: number;
    userData: DocumentData;
}