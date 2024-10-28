import { InjectionToken } from "@angular/core";

export interface RoleConfig {
    superAdmin: string;
    admin: string;
    organizationAdmin: string;
    owner: string;
    user: string;
    // Add more roles as needed
  }

export const ROLES: RoleConfig = {
    superAdmin: 'SUPER_ADMIN',
    admin: 'ADMIN',
    organizationAdmin: 'ORGANIZATION_ADMIN',
    owner: 'OWNER',
    user: 'USER'
};

export const ROLES_TOKEN = new InjectionToken<RoleConfig>('roles.config');
