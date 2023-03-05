import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public getScreenWidth: any;
  public getScreenHeight: any;
  title = 'gis-layers';

  ngOnInit() {

  }
}
