import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { Colors } from '../shared/modul/collors.class';
import { MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Firestore, collection, addDoc, updateDoc, doc } from '@angular/fire/firestore';


@Component({
  selector: 'app-colors-details',
  standalone: true,
  imports: [FormsModule, MatDialogContent, MatDialogActions, MatFormFieldModule, MatSelectModule, MatOptionModule, MatButtonModule, MatInputModule],
  templateUrl: './colors-details.component.html',
  styleUrl: './colors-details.component.scss'
})

export class ColorsDetailsComponent {
  @ViewChild('colorForm') colorForm!: NgForm;

  colors = new Colors;

  constructor(public dialogRef: MatDialogRef<ColorsDetailsComponent>, public firestore: Firestore) { }

  cancel(){
    this.dialogRef.close();
  }

 async save(){
    if (this.colors.id) {
      const colorRef = doc(this.firestore, 'colors', this.colors.id);
      await updateDoc(colorRef, {
        name: this.colors.name,
        charge: this.colors.charge
      });
      this.colors.id = colorRef.id;
    }
    this.dialogRef.close();
  }
}
