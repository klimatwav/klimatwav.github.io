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

    fetch("map.svg")
        .then(response => response.text())
        .then(svgContent => {
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

            //panScaled(100)

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
        })
        .catch(error => console.error("Error loading SVG:", error));
});
