import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  //Funny snackbar hehe
  buttonPressSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: ['mat-toolbar'],
    });
  }
}
