import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  copiedEmail: string | null = null;
  copiedPassword: string | null = null;

  copyToClipboard(text: string): void {
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = text.split(" ")[1];
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Update the state to show the tick icon
    if (text.startsWith('Correo:')) {
      this.copiedEmail = text;
      setTimeout(() => { this.copiedEmail = null; }, 1000); // Hide tick after 2 seconds
    } else if (text.startsWith('Contraseña:')) {
      this.copiedPassword = text;
      setTimeout(() => { this.copiedPassword = null; }, 1000); // Hide tick after 2 seconds
    }

  }
}
