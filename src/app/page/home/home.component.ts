import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, query, where, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable, filter } from 'rxjs';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { FormAddDataComponent } from './components/form-add-data/form-add-data.component';
import { deleteObject, getStorage, ref } from '@angular/fire/storage';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  fs: Firestore = inject(Firestore);
  user$!:Observable<User | null>;
  private readonly authSvc = inject(AuthService);
  data: any[] = [];
  dataFilter: any[] = [];
  nombre = new FormControl(null);

  
  constructor(private dialog: MatDialog){
    this.authSvc.userState$.subscribe((response) => {
      if(response){
        const itemCollection = collection(this.fs, 'items');
        const cons = query(itemCollection, where('uid', '==', response.uid))
        collectionData(cons, { idField: 'id'}).subscribe((response) =>{
          if(response){
            this.data = response;
            this.dataFilter = response
            console.log(response);
                   
          }else{
            this.data = [];
          }
        });
      }
    });
    
    this.nombre.valueChanges.subscribe((response) => {
      console.log(response);
      
      if(response){
        this.dataFilter = this.data.filter((x) => x.nombre.includes(response));
      }else{
        this.dataFilter = this.data
      }
    })
  }

  showModalAdd(){
    this.dialog.open(FormAddDataComponent, {
      disableClose: true,
      width: '300px'
    })
  }

  dialogComfir(data:any){
    this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
      data,
      position: { bottom: '5%'}
    }).afterClosed().subscribe((response) =>{
      if(response) this.deleteDocf(data)
    })
  }

  deleteDocf(data: any){
    const storage = getStorage();
    const storageRef = ref(storage, `archivos/${data.nombrearchivo}`);
    deleteObject(storageRef).then(() =>{
      console.log('Eliminado');
      const docRef = doc(this.fs, 'items', data.id)
      deleteDoc(docRef).then(() =>{
        console.log('eliminado');
      }).catch((error)=>{
        console.log(error);
      })
    }).catch((error) =>{
      console.log(error);
    })
  }
}
