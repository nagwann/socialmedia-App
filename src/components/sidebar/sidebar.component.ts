import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationsService } from '../../services/notifications.service';


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

 ngAfterViewInit(): void {
  this.initializeMenuItems();
  this.initializeThemeCustomization();
}

  private initializeMenuItems(): void {
    const menuItems: NodeListOf<Element> = document.querySelectorAll('.menu_item');
    // remove activeat
    const changeActiveItem = (): void => {
      menuItems.forEach(item => {
        item.classList.remove('active');
      });
    };
    // activeat Element
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');

        //open Notifications_popup
        const notificationsPopup = document.querySelector<HTMLElement>('.Notifications_popup');
        const notificationsCount = document.querySelector<HTMLElement>('#Notifications .Notifications_count');

        if (item.id !== 'Notifications') {
          if (notificationsPopup) notificationsPopup.style.display = 'none';
        } else {
          if (notificationsPopup) notificationsPopup.style.display = 'block';
          if (notificationsCount) notificationsCount.style.display = 'none';
        }
      });
    });
  }



  notifications: any[] = [];

  constructor(
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {

    this.notificationsService.getNotifications().subscribe(data => {
      this.notifications = data;
      console.log('Notifications:', this.notifications);
    });
  }



  
  ////////////////// theme customize /////////////////

  private initializeThemeCustomization(): void {
    const theme = document.querySelector<HTMLElement>('#theme');
    const themeModal = document.querySelector<HTMLElement>('.customize-theme');
    // open theme modal
    const openThemeModal = (): void => {
      if (themeModal) themeModal.style.display = 'grid';
    };

    theme?.addEventListener('click', openThemeModal);
    // Close theme modal
    const closeThemeModal = (e: Event): void => {
      if (e.target instanceof HTMLElement && e.target.classList.contains('customize-theme')) {
        if (themeModal) themeModal.style.display = 'none';
      }
    };

    themeModal?.addEventListener('click', closeThemeModal);

    ////////// change font size
    const fontSizes: NodeListOf<Element> = document.querySelectorAll('.choose-size span');
    const root = document.documentElement;

    // remove active class
    const removeSizeSelector = (): void => {
      fontSizes.forEach(size => size.classList.remove('active'));
    };

    fontSizes.forEach(size => {
      size.addEventListener('click', () => {
        removeSizeSelector();
        // add active class
        size.classList.add('active');

        let fontSize: string = '16px';
        if (size.classList.contains('font-size-1')) {
          fontSize = '13px';
        } else if (size.classList.contains('font-size-2')) {
          fontSize = '16px';
        } else if (size.classList.contains('font-size-3')) {
          fontSize = '18px';
        }

        root.style.fontSize = fontSize;
      });
    });
    ////////// change primary color
    const colorPalette: NodeListOf<Element> = document.querySelectorAll('.choose-color span');
    let primaryHue: number

    // remove active class
    const changeActiveColorClass = (): void => {
      colorPalette.forEach(color => color.classList.remove('active'));
    };

    colorPalette.forEach(color => {
      color.addEventListener('click', () => {
        changeActiveColorClass();

        if (color.classList.contains('color-1')) {
          primaryHue = 252;
        } else if (color.classList.contains('color-2')) {
          primaryHue = 52;
        } else if (color.classList.contains('color-3')) {
          primaryHue = 352;
        } else if (color.classList.contains('color-4')) {
          primaryHue = 152;
        } else if (color.classList.contains('color-5')) {
          primaryHue = 202;
        }

        if (root) {
          root.style.setProperty('--primary-color-hue', primaryHue.toString());
        }

        // add active class
        color.classList.add('active');
      });
    });


    ////////// change background color
    const Bg1 = document.querySelector<HTMLElement>('.bg-1');
    const Bg2 = document.querySelector<HTMLElement>('.bg-2');
    const Bg3 = document.querySelector<HTMLElement>('.bg-3');


    let lightColorLightness: string;
    let whiteColorLightness: string;
    let darkColorLightness: string;

    const changeBg = (): void => {
      root.style.setProperty('--light-color-lightness', lightColorLightness);
      root.style.setProperty('--white-color-lightness', whiteColorLightness);
      root.style.setProperty('--dark-color-lightness', darkColorLightness);
    };

    Bg1?.addEventListener('click', () => {
      Bg1.classList.add('active');
      Bg2?.classList.remove('active');
      Bg3?.classList.remove('active');
      window.location.reload();
    });

    Bg2?.addEventListener('click', () => {
      darkColorLightness = '95%';
      whiteColorLightness = '20%';
      lightColorLightness = '15%';

      changeBg();

      Bg2.classList.add('active');
      Bg1?.classList.remove('active');
      Bg3?.classList.remove('active');
    });

    Bg3?.addEventListener('click', () => {
      darkColorLightness = '95%';
      whiteColorLightness = '10%';
      lightColorLightness = '0%';

      changeBg();

      Bg3.classList.add('active');
      Bg1?.classList.remove('active');
      Bg2?.classList.remove('active');
    });
  }
}
