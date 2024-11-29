window.addEventListener('load', () => {
    const audioElement = document.querySelector('.musique');
    const muteButton = document.querySelector('.mute-btn');
    const muteImg = document.querySelector('.mute-img');
  
    muteButton.addEventListener('click', () => {
      if (audioElement.muted) {
        audioElement.muted = false; // Désactive le mute
        muteImg.src = "sound.png"; // Logo son activé
      } else {
        audioElement.muted = true; // Couper le son
        muteImg.src = "mute.png"; // Logo son coupé 
      }
    });
  });