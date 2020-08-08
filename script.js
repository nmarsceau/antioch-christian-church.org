// Update copyright year
const copyrightCurrentYear = document.getElementById('copyright-current-year');
if (copyrightCurrentYear !== null) {
  copyrightCurrentYear.innerText = (new Date()).getFullYear();
}

// Image slider
(function() {
  function moveToSlide(slider, index) {
    slider.slides[slider.current_slide].classList.remove('active');
    slider.current_slide = (index + slider.slides.length) % slider.slides.length;
    slider.slides[slider.current_slide].classList.add('active');
    slider.style.height = slider.slides[slider.current_slide].clientHeight + 'px';
  }
  function nextSlide(slider) {moveToSlide(slider, slider.current_slide + 1);}
  function previousSlide(slider) {moveToSlide(slider, slider.current_slide - 1);}

  const sliders = document.querySelectorAll('.slider-wrapper');
  for (let i = 0; i < sliders.length; i++) {
    const slider = sliders[i];
    slider.slides = slider.querySelectorAll('.slider-item');
    slider.current_slide = 0;
    slider.lastUserInteraction = null;
    slider.initial_x = null;
    slider.initial_y = null;
    window.addEventListener('load', function() {
      moveToSlide(slider, slider.current_slide);
    });
    window.addEventListener('resize', function() {
      slider.style.height = slider.slides[slider.current_slide].clientHeight + 'px';
    });

    // automatically advance the slider
    setInterval(function() {
      if (slider.lastUserInteraction === null || Date.now() - slider.lastUserInteraction > 15000) {
        nextSlide(slider);
      }
    }, 5000);

    // previous/next buttons
    slider.nav_triggers = slider.querySelectorAll('.next-slide, .previous-slide');
    for (let j = 0; j < slider.nav_triggers.length; j++) {
      const navTrigger = slider.nav_triggers[j];
      navTrigger.addEventListener('click', function() {
        slider.lastUserInteraction = Date.now();
        if (navTrigger.classList.contains('next-slide')) {nextSlide(slider);}
        else if (navTrigger.classList.contains('previous-slide')) {previousSlide(slider);}
      });
    }

    // keyboard navigation
    slider.addEventListener('keydown', function(event) {
      switch (event.keyCode) {
        case 39:
          slider.lastUserInteraction = Date.now();
          nextSlide(slider);
          break;
        case 37:
          slider.lastUserInteraction = Date.now();
          previousSlide(slider);
          break;
      }
    });

    // swipe navigation
    slider.addEventListener('touchstart', function(event) {
      slider.initial_x = event.touches[0].clientX;
      slider.initial_y = event.touches[0].clientY;
    }, false);
    slider.addEventListener('touchmove', function(event) {
      if (slider.initial_x === null || slider.initial_y === null) {return;}
      event.preventDefault();
      const diffX = slider.initial_x - event.touches[0].clientX;
      const diffY = slider.initial_y - event.touches[0].clientY;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        slider.lastUserInteraction = Date.now();
        if (diffX > 0) {nextSlide(slider);}
        else {previousSlide(slider);}
      }
      slider.initial_x = null;
      slider.initial_y = null;
    }, false);
  }
}());
