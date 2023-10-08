import { Component, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalLoginComponent } from './page/home/components/modal-login/modal-login.component';
import { AddUserComponent } from './page/home/components/add-user/add-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyect';
  showMenu = false;
  user$!:Observable<User | null>;
  private readonly authSvc = inject(AuthService);

  constructor(private dialog: MatDialog){
    this.user$ = this.authSvc.userState$;
  }

  showModalLogin(){
    this.dialog.open(ModalLoginComponent, {
      disableClose: true,
      width: '300px'
    })
  }

  async onSignOut(): Promise<void> {
    await this.authSvc.signOut();
  }

  showModalAddUser(){
    this.dialog.open(AddUserComponent, {
      width: '300px'
    })
  }
}
