function showMapOnLocation(location, zoomOutValue = 0) {
    console.log(`location=${location}, zoomOutValue=${zoomOutValue}`);
    const mapContainer = document.getElementById('map-container');
      const sliderContainer = document.querySelector('.slider-container');
  
      if (mapContainer.classList.contains('full-opacity')) {
          // Show player view
          mapContainer.classList.remove('full-opacity');
          sliderContainer.classList.remove('hidden');
      } else {
          // Show map view
          mapContainer.classList.add('full-opacity');
          sliderContainer.classList.add('hidden');
      }
}
  
function createSlide(item) {
    return `
      <div class="swiper-slide">
        <div class="slide-card text-center">
          <img class="slide-card-img-top" src="${item.image}" alt="${item.name}" onclick="playAudio('${item.audio}')" />
          <div class="slide-card-body">
              <h5 onclick="showMapOnLocation('${item.location}')">${item.name}</h5>
              <span onclick="showMapOnLocation('${item.location}', 10)">${item.location}</span>
              <p class="slide-card-text">${item.text}</p>
          </div>
        </div>
      </div>
    `;
}
  
function initSlider(data) {
    const swiperWrapper = document.getElementById('swiper-wrapper');
    swiperWrapper.innerHTML = data.locations.map(createSlide).join('');
  
    const swiper = new Swiper(".swiper", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      slidesPerView: 1,
      loop: true,
      centeredSlides: true,
      spaceBetween: 10,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }
    });
}
  
  
function playAudio(file) {
    var sound = new Howl({
      src: [file],
      html5: true  // Use HTML5 audio for better compatibility
    });
    sound.play();
}

function scaleX(pixels) { 
    console.log(`screen ${window.innerWidth}/${window.innerHeight}`);
    const w = 2560
    const scaleW = w / window.innerWidth
    return pixels / scaleW
}


document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("map-container");

    // Load data and SVG in parallel
    Promise.all([
        fetch("data.json").then(response => response.json()),
        fetch("map.svg").then(response => response.text())
    ])
    .then(([data, svgContent]) => {
        container.innerHTML = svgContent;
        const elem = container.querySelector("svg");

        const panzoom = Panzoom(elem, {
            maxScale: 10,
            step: 0.8,
        })
        
        panzoom.zoom(2, { animate: true })
        elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)
        
        const circle = document.getElementById('node/4569274473'); // WrzeszczDolny
        circle.addEventListener('click', function() {
            playAudio('/audio/walkingup.wav')
        });

        const circle2 = document.getElementById('node/2905330784'); // Wrzeszcz Górny
        circle2.addEventListener('click', function() {
            panzoom.pan(scaleX(100), scaleX(100), { animate: true, duration: 3000 }) 
        });

        const circle3 = document.getElementById('node/2908238053'); // VII Dwór
        circle3.addEventListener('click', function() {
            panzoom.pan(scaleX(200), scaleX(-100), { animate: true, duration: 2000 }) 
            setTimeout(() => {
                panzoom.zoom(10, { animate: true, duration: 2000 })
            }, 2000)
        });

        initSlider(data)
    })
    .catch(error => console.error("Error loading resources:", error));
});
