import { Component, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage'
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-form-add-data',
  templateUrl: './form-add-data.component.html',
  styleUrls: ['./form-add-data.component.scss']
})
export class FormAddDataComponent {
  user:User | null = null;
  nombre = new FormControl(null, Validators.required)
  fs: Firestore = inject(Firestore);
  fsStore: Storage = inject(Storage)
  private readonly authSvc = inject(AuthService);

  
  constructor(private dialog: MatDialog){
    // this.addDocumento();
    this.authSvc.userState$.subscribe((response) => {
      if(response) this.user = response
    });
  }

  addDocumento(url: string, tipo: string, nombrear: string){
    const itemCollection = collection(this.fs, 'items');
    addDoc(itemCollection, {
      nombre:this.nombre.value, 
      url: url, 
      tipo: tipo, 
      uid: this.user?.uid, 
      nombrearchivo: nombrear}
    ).then(() =>{
      this.dialog.closeAll();
    })
  }

  changeFile(data: any){
    if(data.target.files.length > 0){
      this.upgrateDocument(data.target.files[0])
    }
  }

  upgrateDocument(file: File){
    let nameSinForm = file.name.split('.');
    const name = (nameSinForm[0]+ new Date()).replaceAll(' ', '_') +'.'+nameSinForm[1]
    const imagePath = `/archivos/${name}`;
    const storageRef = ref(this.fsStore, imagePath);
    uploadBytesResumable(storageRef, file, {contentType: file.type}).then((response) => {
      getDownloadURL(storageRef).then((response) => {
        let tipo:string = file.name.split('.')[1]
        this.addDocumento(response, tipo, name)
      }).catch((error) => {
        console.log(error);
      })
    }).catch((error: any) => {
      console.log(error);
    })
  }
}
