import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  private placesService = inject(PlacesService);

  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.isFetching.set(true);
    this.placesService.loadAvailablePlaces()
      .subscribe({
        next: (places) => this.places.set(places),
        error: (error: Error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false),
      });
  }

  onSelectPlace(place: Place) {
    this.placesService.addPlaceToUserPlaces(place).subscribe();
  }
}
