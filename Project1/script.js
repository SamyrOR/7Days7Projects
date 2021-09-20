function playSound(sound) {
  let audioElement = document.querySelector(`#s_${sound}`);
  let keyElement = document.querySelector(`div[data-key="${sound}"]`);
  if (audioElement) {
    audioElement.currentTime = 0;
    audioElement.play();
  }

  if (keyElement) {
    keyElement.classList.add("active");
    setTimeout(() => {
      keyElement.classList.remove("active");
    }, 300);
  }
}

function playComposition(songArray) {
  let wait = 0;
  let interval = parseInt(document.querySelector("#interval").value);
  console.log(interval);
  for (let songItem of songArray) {
    setTimeout(() => {
      playSound(`key${songItem}`);
    }, wait);
    wait += interval;
    console.log(wait);
  }
}

document.querySelector(".composer button").addEventListener("click", () => {
  let song = document.querySelector("#input").value;
  let songArray = song.split("");
  playComposition(songArray);
});

document.body.addEventListener("keyup", (event) => {
  playSound(event.code.toLowerCase());
});
