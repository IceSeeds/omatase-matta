
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
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    
    loop: true,
    autoplay: {
      delay: 3000, //3秒後に次の画像に代わる
    }
});
//mySwiper.init;

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
