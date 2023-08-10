import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthModalComponent } from '../auth/auth-modal/auth-modal.component';
import { UserService } from '../services/user-service/user.service';
import { User } from '../../../../shared/user';
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgbCollapseModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  isMenuCollapsed = true;
  user: User | null = null;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.userData$.subscribe((userData) => {
      this.user = userData;
    });
  }

  open(e: any) {
    this.modalService.open(AuthModalComponent, { size: 'l' });
  }

  handleLogout(e: any) {
    this.authService.logout().subscribe((userData) => {
      this.user = userData as User;
      this.userService.updateUser(null); 
      console.log('Logged out successfully');
    });
  }
}
