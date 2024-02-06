// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { PermissionsService } from './services/permission-service';
// import { UserService } from './services/user-service/user.service';
// import { User } from './schemas/user';

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminGuard implements CanActivateFn {
//   constructor(private userService: UserService, private permissionsService: PermissionsService) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//   ): boolean | UrlTree | Observable<boolean | UrlTree> {
//     return this.userService.userData$.pipe(
//       map((user: User | null) => {
//         if (!user) {
//           return false; 
//         }
//         return this.permissionsService.canActivate(user);
//       })
//     );
//   }
// }
