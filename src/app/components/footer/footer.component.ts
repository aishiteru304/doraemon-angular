import { Component } from '@angular/core';
import { faRocket, faTag, faLeaf, faHeart, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public icons = {
    rocketIcon: faRocket,
    tagIcon: faTag,
    leafIcon: faLeaf,
    heartIcon: faHeart,
    angleUpIcon: faAngleUp
  }

  public handleScroll() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

}
