import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageableResponse } from './utils';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiGatewayUrl = environment.apiGatewayUrl;

  private locationControllerPath = '/locations';

  constructor(private http: HttpClient) { }

  createLocation(newLocation: LocationSimpleDTOI): Observable<LocationSimpleDTOI> {
    return this.http
      .post<LocationSimpleDTOI>(
        `${this.apiGatewayUrl}${this.locationControllerPath}`,
        newLocation
      );
  }
  
  getLocations(currentPage: number, pageSize: number, filter: string): Observable<PageableResponse<LocationSimpleDTOI>> {
    let params = new HttpParams()
      .set('page', currentPage)
      .set('size', pageSize)
      .set('search', filter);

    return this.http.get<PageableResponse<LocationSimpleDTOI>>(`${this.apiGatewayUrl}${this.locationControllerPath}`, { params });
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiGatewayUrl}${this.locationControllerPath}/${id}`);
  }

  updateLocation(id: number, updatedLocation: LocationSimpleDTOI): Observable<LocationSimpleDTOI> {
    return this.http.put<LocationSimpleDTOI>(`${this.apiGatewayUrl}${this.locationControllerPath}/${id}`, updatedLocation);
  }

  getAllLocations(searchTerm: string): Observable<LocationSimpleDTOI[]> {
    return this.http.get<LocationSimpleDTOI[]>(`${this.apiGatewayUrl}${this.locationControllerPath}/all`, { params: { search: searchTerm } });
  }


}

export interface LocationSimpleDTOI {
  id: number;
  name: string;
  description: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}
