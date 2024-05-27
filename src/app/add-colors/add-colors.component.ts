import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Colors } from '../shared/modul/collors.class';
import { Firestore, addDoc, collection, updateDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-add-colors',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule],
  templateUrl: './add-colors.component.html',
  styleUrl: './add-colors.component.scss'
})
export class AddColorsComponent implements OnInit {
  constructor(private firestore: Firestore) { }

  colors = new Colors()

  addColor() {
    const colorsRef = collection(this.firestore, 'colors');
    addDoc(colorsRef, this.colors.toJSON());
    console.log(this.colors);
  }

  ngOnInit(): void {
  }

}

