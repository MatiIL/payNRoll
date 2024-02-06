import { Injectable } from '@angular/core';
import { User } from '../schemas/user';

@Injectable()
export class PermissionsService {
  canActivate(user: User): boolean {
    if (user.isAdmin) {
        return true
    } else return false
  }
}