
/*//              基本
//--------------------------------
var mySwiper = new Swiper('.swiper-container', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	}
});
*/


var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    centeredSlides : true,  //アクティブなスライドを中央に表示

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    grabCursor: true,
    parallax: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      1023: {
        slidesPerView: 1,
        spaceBetween: 0
      }
    },
    // Events
    on: {
      imagesReady: function(){
        this.el.classList.remove('loading');
      }
    }
});
mySwiper.init;

/*
// 複数個でも同じ動きでいいなら、ユニークはイラナイ。
var mySwiper2 = new Swiper('.swiper-container2', {
    pagination: {
      el: '.swiper-pagination2',
    },
    navigation: {
      nextEl: '.swiper-button-next2',
      prevEl: '.swiper-button-prev2',
    },
});
mySwiper2.init();
*/

/*           next shadows
//------------------------------------
// Params
var sliderSelector = '.swiper-container',
    options = {
      init: false,
      loop: true,
      speed:800,
      slidesPerView: 2, // or 'auto'
      // spaceBetween: 10,
      centeredSlides : true,
      effect: 'coverflow', // 'cube', 'fade', 'coverflow',
      coverflowEffect: {
        rotate: 50, // Slide rotate in degrees
        stretch: 0, // Stretch space between slides (in px)
        depth: 100, // Depth offset in px (slides translate in Z axis)
        modifier: 1, // Effect multipler
        slideShadows : true, // Enables slides shadows
      },
      grabCursor: true,
      parallax: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1023: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      },
      // Events
      on: {
        imagesReady: function(){
          this.el.classList.remove('loading');
        }
      }
    };
var mySwiper = new Swiper(sliderSelector, options);
// Initialize slider
mySwiper.init();
*/
