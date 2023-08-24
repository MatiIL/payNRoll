import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthModalComponent } from '../auth/auth-modal/auth-modal.component';
import { UserService } from '../services/user-service/user.service';
import { User } from '../../../../shared/user';
import { AuthService } from '../auth/auth.service';
import { SelectPayrollService } from '../services/select-payroll-service';

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
  selectedValue: string = '';

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private selectPayrollService: SelectPayrollService
  ) {
  }

  ngOnInit(): void {
    this.userService.userData$.subscribe((userData) => {
      this.user = userData;
    });

    this.selectPayrollService.getSelectedValue().subscribe(value => {
      this.selectedValue = value;
    });
  }

  handleSelectChange(event: any) {
    const selectedValue = event.target.value;
    setTimeout(() => {
      this.selectPayrollService.setSelectedValue(selectedValue);
      setTimeout(() => {
        this.router.navigate(['/table']); 
      }, 1); 
    }, 1); 
  }
  

  open(e: any) {
    this.modalService.open(AuthModalComponent, { size: 'l' });
  }

  handleLogout(e: any) {
    this.authService.logout().subscribe((userData) => {
      this.user = userData as User;
      this.userService.updateUser(null); 
    });
  }
}
