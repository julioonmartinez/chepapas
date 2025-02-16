import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Chepapas } from '../../shared/interfaces/chepapas';
import { environment } from '../../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChepapasService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + '/api/papas';

  private _chePapas = new BehaviorSubject<Chepapas[]>([]);
  public chePapas$ = this._chePapas.asObservable();

  
  constructor() {
    console.log('service-chepapas')
    this.getAllPapas();
   }

  // loadPapas(): Observable<Chepapas[]>{
  //   return this.http.get<Chepapas[]>(this.apiUrl).pipe(
  //     tap((papas)=> this._chePapas.next(papas)),
  //     catchError(this.handleError)
  //   )

  // }


/** Obtener todos los puestos de papas */
getAllPapas(): Observable<Chepapas[]> {
  console.log(this.apiUrl)
  return this.http.get<Chepapas[]>(this.apiUrl).pipe(
    tap((papas) => this._chePapas.next(papas)), // Actualizar el estado interno
    catchError(this.handleError) // Manejo de errores
  );
}

/** Obtener un puesto de papas por ID */
getPapasById(id: string): Observable<Chepapas> {
  return this.http.get<Chepapas>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
}

/** Crear un nuevo puesto de papas */
createPapas(papas: Chepapas): Observable<Chepapas> {
  return this.http.post<Chepapas>(this.apiUrl, papas).pipe(catchError(this.handleError));
}

/** Actualizar un puesto de papas */
updatePapas(id: string, papas: Partial<Chepapas>): Observable<Chepapas> {
  return this.http.put<Chepapas>(`${this.apiUrl}/${id}`, papas).pipe(catchError(this.handleError));
}

/** Eliminar un puesto de papas */
deletePapas(id: string): Observable<{ message: string }> {
  return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
}

/** Enviar un voto tipo Tinder */
votePapas(id: string, voteType: 'likes' | 'dislike' | 'superPapa'): Observable<any> {
  return this.http
    .post<any>(`${this.apiUrl}/${id}/vote`, { voteType })
    .pipe(catchError(this.handleError));
}

/** Enviar una calificación rápida */
fastReview(id: string, rating: number): Observable<any> {
  return this.http
    .post<any>(`${this.apiUrl}/${id}/fast-review`, { rating })
    .pipe(catchError(this.handleError));
}

/** Manejo de errores */
private handleError(error: HttpErrorResponse) {
  let errorMsg = 'Error desconocido';
  console.error('error', error)
  if (error.error instanceof ErrorEvent) {
    errorMsg = `Error: ${error.error.message}`;
  } else {
    errorMsg = `Error ${error.status}: ${error.error.error || error.message}`;
  }
  return throwError(() => new Error(errorMsg));
}

}
