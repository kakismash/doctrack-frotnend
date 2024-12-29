import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { LocationSimpleDTOI } from "./location.service";
import { PageableResponse } from "./utils";

@Injectable({
    providedIn: 'root'
})
export class OrganizationService {

    private apiGatewayUrl = environment.apiGatewayUrl;
    private organizationControllerPath = '/organizations';

    constructor(private http: HttpClient) { }

    createOrganization(newOrganization: OrganizationUpdateDTOI) {
        return this.http
            .post<OrganizationSimpleDTOI>(
                `${this.apiGatewayUrl}${this.organizationControllerPath}`, 
                newOrganization
            );
    }

    getOrganizations(
        currentPage: number, 
        pageSize: number, 
        filter: string) {
        return this.http
            .get<PageableResponse<OrganizationSimpleDTOI>>(
            `${this.apiGatewayUrl}${this.organizationControllerPath}`, 
            { params: { page: currentPage, size: pageSize, search: filter } }
        );
    }

    deleteOrganization(id: number) {
        return this.http
            .delete<void>(`${this.apiGatewayUrl}${this.organizationControllerPath}/${id}`);
    }

    updateOrganization(id: number, updatedOrganization: OrganizationUpdateDTOI) {
        return this.http
            .put<OrganizationSimpleDTOI>(
                `${this.apiGatewayUrl}${this.organizationControllerPath}/${id}`, 
                updatedOrganization
            );
    }

    getAllOrganizations(searchTerm: string) {
        return this.http
            .get<OrganizationSimpleDTOI[]>(
                `${this.apiGatewayUrl}${this.organizationControllerPath}/all`, 
                { params: { search: searchTerm } }
            );
    }
}

export interface OrganizationSimpleDTOI {
    id: number;
    name: string;
    description: string;
    phone: string;
    address1: string;
    address2: string | null;
    city: string;
    state: string;
    zip: string;
    country: string;
    email: string;
    contactName?: string;
    website?: string;
    logo?: string;
    type?: string;
    status?: string;
    stripeCustomerId?: string;
    locations?: LocationSimpleDTOI[];
    createdBy?: string;
    createdDate?: number; // timestamp
    lastModifiedBy?: string;
    lastModifiedDate?: number; // timestamp
  }

  export interface OrganizationUpdateDTOI {
    id: number;
    name: string;
    description: string;
    phone: string;
    address1: string;
    address2: string | null;
    city: string;
    state: string;
    zip: string;
    country: string;
    email: string;
    contactName?: string;
    website?: string;
    logo?: string;
    type?: string;
    status?: string;
    stripeCustomerId?: string;
    locations?: number[];
    createdBy?: string;
    createdDate?: number; // timestamp
    lastModifiedBy?: string;
    lastModifiedDate?: number; // timestamp
  }