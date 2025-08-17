import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.initializeRequestHandler();
  }

  ////////// follow request
  private initializeRequestHandler(): void {
    const requests = document.querySelectorAll(".request");

    requests.forEach(request => {
      const followBtn = request.querySelector(".btn-primary") as HTMLButtonElement | null;
      const ignoreBtn = request.querySelector(".btn:not(.btn-primary)") as HTMLButtonElement | null;

      if (followBtn && ignoreBtn) {
        followBtn.addEventListener("click", () => {
          if (followBtn.textContent?.trim() === "+ Follow") {
            followBtn.textContent = "Unfollow";
            followBtn.style.background = 'hsla(251, 15.10%, 35.10%, 0.11)';
            followBtn.style.color = 'black';
            ignoreBtn.style.display = "none";
          } else {
            (request as HTMLElement).style.display = "none";
          }
        });

        ignoreBtn.addEventListener("click", () => {
          (request as HTMLElement).style.display = "none";
        });
      }
    });
  }

}
