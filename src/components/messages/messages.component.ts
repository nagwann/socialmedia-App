import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initializeMessagesNotification();
    this.initializeSearchBar();
  }

  private initializeMessagesNotification(): void {
    const messagesNotification = document.querySelector<HTMLElement>('#Messages_Notifications');
    const messages = document.querySelector<HTMLElement>('.Messages');

    messagesNotification?.addEventListener('click', () => {
      if (messages) {
        messages.style.boxShadow = '0 0 1rem var(--color-primary)';
        setTimeout(() => {
          messages.style.boxShadow = 'none';
        }, 1000);
      }
      const notificationCount = messagesNotification.querySelector<HTMLElement>('.Notifications_count');
      if (notificationCount) notificationCount.style.display = 'none';
    });
  }

  private initializeSearchBar(): void {
    const messageElements: NodeListOf<Element> = document.querySelectorAll('.message');
    const messageSearch = document.querySelector<HTMLInputElement>('#messages-search');

    const searchMessage = (): void => {
      if (!messageSearch) return;
      const val = messageSearch.value.toLowerCase();

      messageElements.forEach(chat => {
        const nameElement = chat.querySelector('h5');
        if (nameElement) {
          const name = nameElement.textContent?.toLowerCase() || '';
          chat.setAttribute('style', name.includes(val) ? 'display: flex;' : 'display: none;');
        }
      });
    };

    messageSearch?.addEventListener('keyup', searchMessage);
  }
}
