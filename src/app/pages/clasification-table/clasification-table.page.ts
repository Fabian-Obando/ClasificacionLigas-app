import { Component, OnInit } from '@angular/core';
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

import { ClasificationService } from '../../services/clasification';

import { ILeague } from '../../models/league.model';
import { ISeason } from '../../models/season.model';
import { IClasification } from '../../models/clasification.model';

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
export class ClasificationTablePage implements OnInit {

  ligas: ILeague[] = [];
  temporadas: ISeason[] = [];
  clasificacion: IClasification[] = [];

  ligaSeleccionada = '';
  temporadaSeleccionada = '';
  cargando = false;

  constructor(
    private clasificationService: ClasificationService
  ) { }

  ngOnInit(): void {
    this.cargarLigas();
  }

  cargarLigas(): void {
    this.clasificationService.getFootballLeagues().subscribe({
      next: (resp: ILeague[]) => {
        this.ligas = resp;

        const laLiga = this.ligas.find(liga => liga.idLeague === '4335');

        if (laLiga) {
          this.ligaSeleccionada = laLiga.idLeague;
        } else if (this.ligas.length > 0) {
          this.ligaSeleccionada = this.ligas[0].idLeague;
        }

        this.cargarTemporadas();
      },
      error: () => {
        this.ligas = [];
      }
    });
  }

  cargarTemporadas(): void {
    this.temporadas = [];
    this.temporadaSeleccionada = '';
    this.clasificacion = [];

    if (!this.ligaSeleccionada) {
      return;
    }

    this.clasificationService.getSeasons(this.ligaSeleccionada).subscribe({
      next: (resp: ISeason[]) => {
        this.temporadas = resp;

        const temporadasPreferidas = [
          '2008-2009',
          '2024-2025',
          '2023-2024',
          '2022-2023'
        ];

        const preferida = this.temporadas.find(temporada =>
          temporadasPreferidas.includes(temporada.strSeason)
        );

        if (preferida) {
          this.temporadaSeleccionada = preferida.strSeason;
        } else if (this.temporadas.length > 0) {
          this.temporadaSeleccionada = this.temporadas[0].strSeason;
        }

        this.cargarTabla();
      },
      error: () => {
        this.temporadas = [];
      }
    });
  }

  cargarTabla(): void {
    if (!this.ligaSeleccionada || !this.temporadaSeleccionada) {
      return;
    }

    this.cargando = true;

    this.clasificationService
      .getTableClasification(this.ligaSeleccionada, this.temporadaSeleccionada)
      .subscribe({
        next: (resp: IClasification[]) => {
          this.clasificacion = resp;
          this.cargando = false;
        },
        error: () => {
          this.clasificacion = [];
          this.cargando = false;
        }
      });
  }
}