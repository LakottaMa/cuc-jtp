import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { Colors } from '../shared/modul/collors.class';
import { MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Firestore, deleteDoc, updateDoc, doc } from '@angular/fire/firestore';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-colors-details',
  standalone: true,
  imports: [FormsModule, MatDialogContent, MatFormFieldModule, MatIconModule, MatSelectModule, MatOptionModule, MatButtonModule, MatInputModule, MatDatepickerModule],
  templateUrl: './colors-details.component.html',
  styleUrl: './colors-details.component.scss',
  providers: [provideNativeDateAdapter()],
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
        charge: this.colors.charge,
        date: this.colors.date
      });
      this.colors.id = colorRef.id;
    }
    this.dialogRef.close();
    console.log('save', this.colors);
  }

  deleteColor() {
    if (!this.colors.id) {
      return;
    }
    const colorRef = doc(this.firestore, 'colors', this.colors.id);
    deleteDoc(colorRef);
    this.dialogRef.close();
    console.log('delete', this.colors);
  }
}
