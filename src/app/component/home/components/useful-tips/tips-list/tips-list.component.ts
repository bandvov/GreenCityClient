import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { SwiperDirective, SwiperComponent, SwiperScrollbarInterface, SwiperPaginationInterface, SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-tips-list',
  templateUrl: './tips-list.component.html',
  styleUrls: ['./tips-list.component.scss']
})
export class TipsListComponent implements OnInit {
  //difine img arr
  imageArr = [
    'assets/img/icon/spoon-knife.png',
    'assets/img/icon/water-bottle.png',
    'assets/img/icon/coffee-cup.png',
    'assets/img/icon/water-bottle.png',
  ];
  tips;
  _reload:boolean;

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    observer: true,
    centeredSlides: true,
    centerInsufficientSlides: true,
    slidesPerView: 4,
    loop: true,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: {
      nextEl: '.button-next',
      prevEl: '.button-prev',
    }
  };

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  constructor( private translateService: TranslateService ) { }

  ngOnInit() { 
    this.translateService.onDefaultLangChange.subscribe(event=>{
      const { content } = event.translations.homepage["eco-advices"];
      this.tips = this.addImagesToTips(content);
      setTimeout(()=>{this._reload = false})
      setTimeout(()=>{this._reload = true})
    })
  }
  // simple add img path to each translate obj
  addImagesToTips(array){
    array.forEach((element, index) => {
      element.imageUrl = this.imageArr[index]
    });
    return array;
  }

}
