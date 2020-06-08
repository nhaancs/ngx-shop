import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AppUser } from 'shared/models/app-user';
import { ObservableInput } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from 'firebase'

@Injectable()
export class UserService {
  constructor(private afDatabase: AngularFireDatabase) { }

  /**
   * Convert a user info get from Firebase authentication 
   * to AppUser and store it to Firebase database
   */
  save(user: User): Promise<void> {
    return this.afDatabase.object('/users/' + user.uid)
      .update(AppUser.toRequest(user))
  }

  get(uid: string): ObservableInput<AppUser> {
    return this.afDatabase.object('/users/' + uid)
      .snapshotChanges()
      .pipe(map(this.toModel))
  }

  private toModel = res => res.key ? AppUser.fromResponse({key: res.key, ...res.payload.exportVal()}) : null

  private toModels = (res: any[]) => res.map(this.toModel)
}
