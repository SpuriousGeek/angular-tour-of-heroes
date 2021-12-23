import { Component, OnInit, Input } from '@angular/core';
import { Hero } from 'src/app/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;

  // ActivatedRoute holds information about the route to this instance
  // of the HeroDetailComponent.
  // The location is an Angular service for interacting with the browser.
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // route.snapshot is a static image of the route information shortly after
    // the component was created. The paramMap is a dictionary of route param
    // values extracted from the URL. Route parameters are always strings
    // hence the JavaScript Number function is used to convert stringn to a
    // number, which is what the hero id should be.
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
}
