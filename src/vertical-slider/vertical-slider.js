  // import Swiper bundle with all modules installed
  import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js'
    var swiper = new Swiper(".mySwiper", {
        direction: "vertical",
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });

    // const slider = document.querySelector('.slider');
    // const sliderHeight = slider.clientHeight;
    // const slides = document.getElementsByClassName('slider_slide');

    // const upButton = document.querySelector('.-up');
    // const downButton = document.querySelector('.-down');

    // var activeSlideIndex = 0;

    // upButton.addEventListener('click', () => decrementSlideIndex());
    // downButton.addEventListener('click', () => incrementSlideIndex());

    // function decrementSlideIndex(){
    //     upButton.style.transform = `translateX(-200px)`;
    //     if(activeSlideIndex > 0){
    //         activeSlideIndex -= 1;
    //         changeSlide();    
    //     }
    // }

    // function incrementSlideIndex(){
    //     if(activeSlideIndex < slides.length - 1){
    //         activeSlideIndex += 1;
    //         changeSlide();
    //     }
    // }

    // function changeSlide(){
    //     slider.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
    // }



