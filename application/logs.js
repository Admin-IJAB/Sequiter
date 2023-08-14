const titleLog = document.getElementById("stLog");
const artistLog = document.getElementById("saLog");
const descriptionLog = document.getElementById("sdLog");
const drumKitLog = document.getElementById("dkvLog");
const reverbLog = document.getElementById("rvLog");
const distLog = document.getElementById("dvLog");
const delayLog = document.getElementById("ppdvLog");
const melRevLog = document.getElementById("mrvLog");
const melEffLog = document.getElementById("mevLog");
const drumVolLog = document.getElementById("drumVolLog");
const melVolLog = document.getElementById("melVolLog");
const bpmLog = document.getElementById("bpmLog");
const stepLog = document.getElementById("stepLog");

const bpmInput = document.getElementById("bpm");
const drumRevInput = document.getElementById("reverb");
const distInput = document.getElementById("distortion");
const delayInput = document.getElementById("pingDelay");
const melRevInput = document.getElementById("melReverb");
const melEffInput = document.getElementById("melEffect");


// global variables to load in to default
let songTitle;
let songArtist;
let songDescription;
let loadedKit;
let reverbLevel = 0;
let distortionLevel = 0;
let delayLevel = 0;
let melRevebLevel = 0;
let melPhsrLevel = 0;
let bpmValue = 0;
let stepValue = 8;

// global variables pre-set
let drumVolLevel = -3;
let melVolLevel = -3;


// isLoadedFromSave variable
let isLoadedFromSave = false;



// all effect variables created and value set to default
// This is a duplication in app.js -- may cause issues
let reverb = new Tone.Reverb(1);
let dist = new Tone.Distortion(2);
let delay = new Tone.PingPongDelay(.1, .5);
let melReverb = new Tone.Reverb(1);
let melPhsr = new Tone.Phaser({
    frequency : 0.5 ,
    octaves : 5 ,
    stages : 20 ,
    Q : 3 ,
    baseFrequency : 350
});

// instance's levels set
reverb.wet.value = 0;
dist.wet.value = 0;
delay.wet.value = 0;
melReverb.wet.value = 0;
melPhsr.wet.value = 0;

// on load event that will decide to load from save or to load from default
// for finished product, it take the place of declaring default values from above.

document.addEventListener("DOMContentLoaded", () => {

    if (isLoadedFromSave) {
        songTitle = titleLog.innerText || "New loopz"
        songArtist = artistLog.innerText || "Barney";
        songDescription = descriptionLog.innerText || "Just a lil something..";
        loadedKit = drumKitLog.innerText || "technoDrums";
        reverbLevel = reverbLog.innerText || 0;
        distortionLevel = distLog.innerText || 0;
        delayLevel = delayLog.innerText || 0;
        melRevebLevel = melRevLog.innerText || 0;
        melPhsrLevel = melEffLog.innerText || 0
        bpmValue = bpmLog.innerText || 150;
        stepValue = stepLog.innerText || 8;
        
        updateLogs();

    } else {
        songTitle = titleLog.innerText || "New loopz"
        songArtist = artistLog.innerText || "Barney";
        songDescription = descriptionLog.innerText || "Just a lil something..";
        loadedKit = "technoDrums";
        reverbLevel = 0;
        distortionLevel = 0;
        delayLevel = 0;
        melRevebLevel = 0;
        melPhsrLevel = 0;
        bpmValue = 133;
        stepValue = 8;
        
        updateLogs();
    }
});

function updateLogs() {
    titleLog.innerText = songTitle;
    artistLog.innerText = songArtist;
    descriptionLog.innerText = songDescription;
    drumKitLog.innerText = loadedKit;
    drumVolLog.innerText = drumVolLevel;
    melVolLog.innerText = melVolLevel;
    reverbLog.innerText = reverbLevel;
    distLog.innerText = distortionLevel;
    delayLog.innerText = delayLevel;
    melRevLog.innerText = melRevebLevel
    melEffLog.innerText = melPhsrLevel;
    bpmLog.innerText = bpmValue;
    stepLog.innerText = stepValue;

    drumRevInput.placeholder = reverbLog.innerText
    distInput.placeholder = distLog.innerText;
    delayInput.placeholder = delayLog.innerText;
    melRevInput.placeholder = melRevLog.innerText;
    melEffInput.placeholder = melEffLog.innerText;
    bpmInput.placeholder = bpmLog.innerText;
    reverb.wet.value = reverbLevel;
    dist.wet.value = distortionLevel;
    delay.wet.value = delayLevel;
    melReverb.wet.value = melRevebLevel;
    melPhsr.wet.value = melPhsrLevel;
    
}

