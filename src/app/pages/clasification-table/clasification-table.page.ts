import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-clasification-table',
  templateUrl: './clasification-table.page.html',
  styleUrls: ['./clasification-table.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSelect,
    IonSelectOption
  ]
})
export class ClasificationTablePage {

  ligaSeleccionada = '';

  temporadaSeleccionada = '';

  ligas = [
    'Spanish La Liga',
    'English Premier League',
    'German Bundesliga',
    'Italian Serie A',
    'French Ligue 1'
  ];

  temporadas = [
    '2024-2025',
    '2023-2024',
    '2022-2023'
  ];

}