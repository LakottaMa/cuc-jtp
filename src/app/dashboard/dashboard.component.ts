import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Firestore, onSnapshot, collection, doc, deleteDoc, Timestamp } from '@angular/fire/firestore';
import { Colors } from '../shared/modul/collors.class';
import { MatDialog } from '@angular/material/dialog';
import { ColorsDetailsComponent } from '../colors-details/colors-details.component';

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
  constructor(public firestore: Firestore, public dialog: MatDialog) { }

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
        if (colorData.date instanceof Timestamp) {
          colorData.date = colorData.date.toDate();
        }
        this.allColors.push(colorData);
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
    const dialogRef = this.dialog.open(ColorsDetailsComponent, {restoreFocus: false});
    dialogRef.componentInstance.colors = color;
  }
}
