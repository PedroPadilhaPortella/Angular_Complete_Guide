import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ErrorService } from '../shared/error.service';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    const errorMessage = 'Something went wrong fetching available places. Please, try again later!';
    return this.fetchPlaces('http://localhost:3000/places', errorMessage);
  }

  loadUserPlaces() {
    const errorMessage = 'Something went wrong fetching your favorite places. Please, try again later!';
    return this.fetchPlaces('http://localhost:3000/user-places', errorMessage)
      .pipe(
        tap({
          next: (userPlaces) => this.userPlaces.set(userPlaces),
        })
      );
  }

  addPlaceToUserPlaces(place: Place) {
    const currentPlaces = this.userPlaces();

    if (!currentPlaces.some(p => p.id === place.id)) {
      this.userPlaces.set([...currentPlaces, place]);
    }

    return this.httpClient.put('http://localhost:3000/user-places', { placeId: place.id })
      .pipe(
        catchError((error) => {
          this.userPlaces.set(currentPlaces);
          this.errorService.showError('Failed to store selected place');
          return throwError(() => new Error('Failed to store selected place'));
        })
      );
  }

  removeUserPlace(place: Place) {
    const currentPlaces = this.userPlaces();

    if (currentPlaces.some(p => p.id === place.id)) {
      this.userPlaces.set(currentPlaces.filter(p => p.id != place.id));
    }

    return this.httpClient.delete(`http://localhost:3000/user-places/${place.id}`)
      .pipe(
        catchError((error) => {
          this.userPlaces.set(currentPlaces);
          this.errorService.showError('Failed to remove favorite place');
          return throwError(() => new Error('Failed to remove favorite place'));
        })
      );
  }

  private fetchPlaces(url: string, errorMessage?: string): Observable<Place[]> {
    return this.httpClient.get<{ places: Place[] }>(url)
      .pipe(
        map((response) => response.places),
        catchError((error) => {
          console.log(error.message);
          return throwError(
            () => new Error(errorMessage || 'Something went wrong. Please, try again later!')
          );
        })
      )
  }
}
