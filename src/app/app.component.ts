import { CommonModule } from '@angular/common';
import { Component,HostListener,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
 currentValue = '';
  lastSavedValue = '';
  message = '';

  ngOnInit(): void {
    // Load last saved value from localStorage 
    const saved = localStorage.getItem('savedValue');
    this.lastSavedValue = saved ? saved : '';
    this.currentValue = '';  // clear input box after refresh
  }

  save() {
    const trimmedInput = this.currentValue.trim();
    if (trimmedInput === '') {
      this.message = 'Input is empty. Please type something.';
    } else if (trimmedInput === this.lastSavedValue) {
      this.message = 'Changes are already saved.';
    } else {
      this.lastSavedValue = trimmedInput;
      localStorage.setItem('savedValue', this.lastSavedValue);
      this.message = 'Changes saved!';
    }
    setTimeout(() => (this.message = ''), 3000);
  }

  hasUnsavedChanges(): boolean {
    return this.currentValue.trim() !== this.lastSavedValue;
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent) {
    if (this.hasUnsavedChanges()) {
      event.preventDefault();
    }
  }

}
