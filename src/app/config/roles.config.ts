import { InjectionToken } from "@angular/core";

export interface RoleConfig {
    admin: string;
    owner: string;
    user: string;
    // Add more roles as needed
  }

export const ROLES: RoleConfig = {
    admin: 'ADMIN',
    owner: 'OWNER',
    user: 'USER'
};

export const ROLES_TOKEN = new InjectionToken<RoleConfig>('roles.config');
