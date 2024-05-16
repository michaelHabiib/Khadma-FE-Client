import { Component, Input } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderService } from '../../Services/loader.service';
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Input() isLoading: boolean = false;

  constructor(private LoaderService: LoaderService) {
    // You can use a service to control the loader state
    this.LoaderService.loadingStatus.subscribe((status: boolean) => {
      this.isLoading = status;
    });
  }
}
