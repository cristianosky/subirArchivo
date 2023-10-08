import { Injectable, inject } from '@angular/core';
import { Auth, authState} from '@angular/fire/auth'
import { MatDialog } from '@angular/material/dialog';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
}
