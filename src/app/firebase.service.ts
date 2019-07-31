import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Response } from './response';
import { Demographics } from './demographics';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
	private responsesCollection: AngularFirestoreCollection<Object>;
	private demographicsCollection: AngularFirestoreCollection<Object>;

  constructor(db:AngularFirestore) {
  	this.responsesCollection = db.collection<Object>('responses');
  	this.demographicsCollection = db.collection<Object>('demographics');
  }

  addResponse(response:Response) {
  	this.responsesCollection.add(response.getData());
  }

  addDemographics(demographics:Demographics, uid:string) {
    this.demographicsCollection.doc(uid).set(demographics.getData());
  }
}
