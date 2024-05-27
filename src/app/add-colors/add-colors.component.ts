import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { Colors } from '../shared/modul/collors.class';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';


@Component({
  selector: 'app-add-colors',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatOptionModule],
  templateUrl: './add-colors.component.html',
  styleUrl: './add-colors.component.scss'
})
export class AddColorsComponent implements OnInit {
  constructor(private firestore: Firestore) { }
  @ViewChild('colorForm') colorForm!: NgForm;
  colors = new Colors();

  addColor() {
    const colorsRef = collection(this.firestore, 'colors');
    addDoc(colorsRef, this.colors.toJSON())
    .then(() => {
    console.log('added', this.colors);
    this.colorForm.resetForm();
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
  }



  ngOnInit(): void {
  }

}

