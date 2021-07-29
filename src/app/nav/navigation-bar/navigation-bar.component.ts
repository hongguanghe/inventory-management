import { Component, OnInit } from '@angular/core';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { MatDialog } from '@angular/material/dialog';
// import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})

export class NavigationBarComponent implements OnInit {
  // welcomeMessage = '';
  // public links = [
  //   { displayText: 'Dashboard', path: 'dashboard', icon: 'dashboard' },
  //   { displayText: 'Users', path: 'users', icon: 'supervisor_account' },
  //   { displayText: 'Devices', path: 'devices', icon: 'settings_remote' },
  //   // { displayText: 'SIMs', path: 'sims', icon: 'sim_card'  },
  //   { displayText: 'Assets', path: 'assets', icon: 'train' },
  //   { displayText: 'Accounts', path: 'accounts', icon: 'business' },
  //   { displayText: 'Shipments', path: 'shipments', icon: 'local_shipping' },
  //   { displayText: 'Permissions', path: 'policies', icon: 'lock' }
  // ];

  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map((result) => result.matches));

  // constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog) { }

  ngOnInit() {
  }

  // logout() {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     data: {
  //       title: 'Are you sure you want to logout?',
  //       message: 'This will log you out of the Operational Portal',
  //       confirmColor: 'warn',
  //       buttonText: {
  //         ok: 'Logout',
  //         cancel: 'Cancel'
  //       }
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.authService.logout();
  //     }
  //   });
  // }
}
