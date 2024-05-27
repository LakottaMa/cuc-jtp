import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Firestore, onSnapshot, collection } from '@angular/fire/firestore';
import { Colors } from '../shared/modul/collors.class';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {

  allColors: Colors[] = [];

  constructor(public firestore: Firestore) { }

  ngOnInit() {
    this.loadColors();
  }
  loadColors() {

    const colorsRef = collection(this.firestore, 'colors');
    this.allColors = [];
    onSnapshot(colorsRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const colorData = doc.data() as Colors;
        colorData.id = doc.id;
        this.allColors.push(colorData);
      });
    });
  }

}
