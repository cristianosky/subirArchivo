import { Injectable, inject } from '@angular/core';
import { Auth, User, authState, getAuth, updateProfile} from '@angular/fire/auth'
import { MatDialog } from '@angular/material/dialog';
import { signInWithEmailAndPassword, updateCurrentUser } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth:any = inject(Auth);

  constructor(private dialog: MatDialog) {}

  get userState$() {
    return authState(this.auth);
  }

  async signIn(email: string, password: string): Promise<void>{
    try {
      const { user } = await signInWithEmailAndPassword(this.auth, email, password);
      this.dialog.closeAll()
    } catch (error: unknown){
      console.log(error);
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error: unknown) {
      console.log(error);
    }
  }

  async uodateUser(userUpdate: User): Promise<void>{
    try {
      const auth = getAuth();
      if(auth.currentUser){  
        const user = await updateProfile(auth.currentUser, userUpdate)
        this.dialog.closeAll()
      }else{
        throw 'error';
      }
    } catch (error: unknown) {
      console.log(error);
    }
  }
}
