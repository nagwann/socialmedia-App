import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from '../components/navbar/navbar.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { PostComponent } from '../components/post/post.component';
import { MessagesComponent } from '../components/messages/messages.component';
import { RequestsComponent } from '../components/requests/requests.component';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, NavbarComponent, PostComponent, MessagesComponent, RequestsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'socialApp';
}



