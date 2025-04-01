const data = [
  {
    image: "player/note.svg",
    name: "Lang Fuhr",
    location: "Wrzeszcz Górny",
    text: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat",
    audio: "../audio/walkingup.wav",
    date: "2025-04-01"
  },
  {
    image: "player/note.svg",
    name: "Przelewki",
    location: "Wrzeszcz Dolny",
    text: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat",
    audio: "../audio/walkingup.wav",
    date: "2025-04-02"
  },
  {
    image: "player/note.svg",
    name: "Józef K",
    location: "Wrzeszcz Górny",
    text: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat",
    audio: "../audio/walkingup.wav",
    date: "2025-04-03"
  },
  {
    image: "player/note.svg",
    name: "Ulica Elektryków",
    location: "Wrzeszcz Górny",
    text: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat",
    audio: "../audio/walkingup.wav",
    date: "2025-04-04"
  }
];

function playAudio(file) {
    var sound = new Howl({
      src: [file],
      html5: true  // Use HTML5 audio for better compatibility
    });
    sound.play();
}

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

function init() {
    
  const swiperWrapper = document.getElementById('swiper-wrapper');
  swiperWrapper.innerHTML = data.map(createSlide).join('');

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


document.addEventListener('DOMContentLoaded', init);
