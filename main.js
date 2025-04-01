// Create a MapController module to handle map-related functionality
const MapController = {
    panzoom: null,
    initialZoom: 2,
    
    init(elem) {
        this.panzoom = Panzoom(elem, {
            maxScale: 10,
            step: 0.8,
        });
        
        this.panzoom.zoom(this.initialZoom, { animate: true });
        elem.parentElement.addEventListener('wheel', this.panzoom.zoomWithWheel);
        
        this.setupMapInteractions();
    },

    setupMapInteractions() {
        const circle = document.getElementById('node/4569274473'); // WrzeszczDolny
        circle.addEventListener('click', () => ViewController.switchView());

        const circle2 = document.getElementById('node/2905330784'); // Wrzeszcz Górny
        circle2.addEventListener('click', () => {
            this.panzoom.pan(scaleX(100), scaleX(100), { animate: true, duration: 3000 });
        });

        const circle3 = document.getElementById('node/2908238053'); // VII Dwór
        circle3.addEventListener('click', () => {
            this.panTo(200, -100)
            setTimeout(() => {
                this.panzoom.zoom(10, { animate: true, duration: 2000 });
            }, 2000);
        });
    },

    showLocation(location, zoomOutValue = 0) {
        console.log(`location=${location}, zoomOutValue=${zoomOutValue}`);
        ViewController.switchView();
        if(zoomOutValue > 0 && this.panzoom) {
            this.panzoom.zoom(zoomOutValue, { animate: true, duration: 2000 });
        } else {
            this.panzoom.zoom(this.initialZoom, { animate: true, duration: 2000 });
        }
    },

    panTo(x, y) {
        this.panzoom.pan(scaleX(x), scaleX(y), { animate: true, duration: 2000 });
    }
};

// Create a ViewController module to handle view-related functionality
const ViewController = {
    switchView() {
        const mapContainer = document.getElementById('map-container');
        const sliderContainer = document.querySelector('.slider-container');
      
        if (mapContainer.classList.contains('full-opacity')) {
            mapContainer.classList.remove('full-opacity');
            sliderContainer.classList.remove('hidden');
        } else {
            mapContainer.classList.add('full-opacity');
            sliderContainer.classList.add('hidden');
        }
    }
};

// Create a SliderController module to handle slider-related functionality
const SliderController = {
    init(data) {
        const swiperWrapper = document.getElementById('swiper-wrapper');
        swiperWrapper.innerHTML = data.locations.map(this.createSlide).join('');
    
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
        swiper.on('slideChangeTransitionEnd', function (swiper) {
            const location = data.locations[swiper.realIndex];
            MapController.panTo(location.coordinates.x, location.coordinates.y);
        });
    },

    createSlide(item) {
        return `
            <div class="swiper-slide">
                <div class="slide-card text-center">
                    <img class="slide-card-img-top" src="${item.image}" alt="${item.name}" onclick="AudioController.play('${item.audio}')" />
                    <div class="slide-card-body">
                        <h5 onclick="MapController.showLocation('${item.locationName}')">${item.name}</h5>
                        <span onclick="MapController.showLocation('${item.locationName}', 10)">${item.locationName}</span>
                        <p class="slide-card-text">${item.text}</p>
                    </div>
                </div>
            </div>
        `;
    }
};

// Create an AudioController module to handle audio-related functionality
const AudioController = {
    currentSound: null,

    play(file) {
        if (this.currentSound) {
            this.currentSound.stop();
        }

        this.currentSound = new Howl({
            src: [file],
            html5: true
        });
        this.currentSound.play();
    }
};

// Utility function for scaling
function scaleX(pixels) { 
    console.log(`screen ${window.innerWidth}/${window.innerHeight}`);
    const w = 2560;
    const scaleW = w / window.innerWidth;
    return pixels / scaleW;
}

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("map-container");

    Promise.all([
        fetch("data.json").then(response => response.json()),
        fetch("map.svg").then(response => response.text())
    ])
    .then(([data, svgContent]) => {
        container.innerHTML = svgContent;
        const elem = container.querySelector("svg");
        
        MapController.init(elem);
        SliderController.init(data);
    })
    .catch(error => console.error("Error loading resources:", error));
});
