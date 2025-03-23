function playAudio(file) {
    var sound = new Howl({
      src: [file],
      html5: true  // Use HTML5 audio for better compatibility
    });
    sound.play();
}

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("map-container");

    fetch("map.svg")
        .then(response => response.text())
        .then(svgContent => {
            container.innerHTML = svgContent;
            const elem = container.querySelector("svg");

            const panzoom = Panzoom(elem, {
                maxScale: 10
              })
            //panzoom.pan(1000, 1000)
            panzoom.zoom(2, { animate: true })
            elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)
            
            const circle = document.getElementById('node/4569274473'); // WrzeszczDolny
            circle.addEventListener('click', function() {
                playAudio('/audio/walkingup.wav')
            });
        })
        .catch(error => console.error("Error loading SVG:", error));
});
