import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Firestore, onSnapshot, collection, doc, deleteDoc } from '@angular/fire/firestore';
import { Colors } from '../shared/modul/collors.class';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {

  allColors: Colors[] = [];
  private unsubscribe: any;

  constructor(public firestore: Firestore) { }

  ngOnInit() {
    this.loadColors();
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  loadColors() {
    this.unsubscribe = onSnapshot(collection(this.firestore, 'colors'), (querySnapshot) => {
      this.allColors = [];
      querySnapshot.forEach((doc) => {
        const colorData = doc.data() as Colors;
        colorData.id = doc.id;
        this.allColors.push(colorData);
        console.log('load from db', colorData);
      });
    })
  }

  deleteColor(color: Colors) {
    const colorsRef = collection(this.firestore, 'colors');
    const colorRef = doc(colorsRef, color.id);
    deleteDoc(colorRef);
    console.log('delete', color);
  }

  editColor(color: Colors) {
    console.log('edit', color);
  }
}
