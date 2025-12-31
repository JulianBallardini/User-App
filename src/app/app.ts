import { Component, signal } from '@angular/core';
import { UserApp } from './components/user-app/user-app';

@Component({
  selector: 'app-root',
  imports: [UserApp],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('5-Users-App');
}
