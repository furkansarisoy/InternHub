import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private angularFirestore: AngularFirestore) { }

  getUserByUserId(userId: string) {
    return this.angularFirestore.collection<User>('users', ref => ref.where('uid', '==', userId)).valueChanges();
  }

}
