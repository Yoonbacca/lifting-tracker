var mainAudio = document.createElement("AUDIO");
var endAudio = document.createElement("AUDIO")
       // Create audio objects and preload the audio files
mainAudio.setAttribute("src", "/assets/Casa-Bossa-Nova.mp3");
endAudio.setAttribute("src", "/assets/EBD.m4a");

// Listen for the 'canplaythrough' event to ensure the audio is preloaded
mainAudio.addEventListener('loadeddata', function() {
    // Audio is preloaded and ready to play
    // You can initiate the elevator or play the audio here
});

// Similarly, listen for the 'canplaythrough' event for the end audio
endAudio.addEventListener('loadeddata', function() {
    // End audio is preloaded and ready to play
});