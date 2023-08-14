
import { allTheKits } from "./percs.js";
// import { stepTot } from "./logs.js";

// new effect instances
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

// global values default
let totalSteps = Number(document.getElementById("stepLog").innerText) || 8;
console.log(totalSteps);

// percussion + melody instance's levels set
reverb.wet.value = 0;
dist.wet.value = 0;
delay.wet.value = 0;
melReverb.wet.value = 0;
melPhsr.wet.value = 0;



// sequencer variables
let playButtonInit = false;
let melSeqInit = false;
let isPlaying = false;
let melIsOn = true;


// function that handles both sequencers with some logic
const linkSequencer = () => {
    document.getElementById("play").addEventListener("click", async () => {
        await Tone.start();

        // if melody sequencer has not been turned on, only play drum sequencer
        if (!melIsOn) {
            // if this is the first time user presses play, run the drum sequencer function.
            if (!playButtonInit) {
                drumSeqOn();
            }

            // if play has already been pressed, use the "isPlaying" variable to control paused and unpaused.
            if (isPlaying) {
                Tone.Transport.stop();
                isPlaying = false;
            } else {
                Tone.Transport.start();
                isPlaying = true;
            }
            // if melody sequencer is turned on, play both sequencers together. 
        } else {
            if (!playButtonInit) {
                drumSeqOn();
                melSeqOn();
            }

            if (isPlaying) {
                Tone.Transport.stop();
                isPlaying = false;
            } else {
                Tone.Transport.start();
                isPlaying = true;
            }

        }
    });
}
linkSequencer();


// turn on melody sequencer
// document.getElementById("melOnOff").addEventListener("click", () => {
//     document.getElementById("pushMelody").classList.remove("hide");
//     document.getElementById("melOnOff").classList.add("hide");
//     melIsOn = "true";
// })





// functions that handle the drum and the melody sequencer asigning rows and playing sounds.
function drumSeqOn() {
    console.log("playing sequencer...");
    let index = 0;
    Tone.Transport.scheduleRepeat(repeat, `${totalSteps}n`);
    
    function repeat() {
        Tone.Transport.bpm.value = bpmValue;
        let step = index % totalSteps; // modification to total steps
        allTheKits[loadedKit].forEach(drum => {
            const drumPlayer = new Tone.Player(drum.src)
                // .connect(drumVol)
                .chain(reverb, dist, delay, Tone.Destination);
            drumPlayer.volume.value = drumVolLevel;
            const row = document.getElementById(`${drum.name}Row`);
            let iCheck = row.querySelector(`input:nth-child(${step + 1})`);
            if (iCheck.checked) {
                drumPlayer.autostart = true;
            }
        });
        index++;
    }
    playButtonInit = true;
}


const cMinScale = ["A#", "B#", "C", "D", "D#", "F", "G"];


const memSyn = new Tone.PolySynth({
    polyphony : 5 ,
    volume : .5 ,
    detune : -1 ,
    voice : Tone.FMSynth
}).chain(melReverb, melPhsr, Tone.Destination);


function melSeqOn() {
    console.log("melody sequencer playing...");
    let index = 0;
    Tone.Transport.scheduleRepeat(repeat, "8n")
    function repeat() {
        Tone.Transport.bpm.value = bpmValue;
        memSyn.volume.value = melVolLevel;
        let step = index % totalSteps;
        cMinScale.forEach(note => {
            const row = document.getElementById(`${note}Row`);
            let iCheck = row.querySelector(`input:nth-child(${step + 1})`);
            if (iCheck.checked) {
                memSyn.triggerAttackRelease(`${note}4`, "8n");
            }
        })
        index++;
    }
}




// window.* cuz html src type = module ... global scope
// switchers - these functions are assigned in the html as "onchange" attributes in their respective selector.
// based on user selections from the drop down menus, re-assign the global active variables to match the user input.
window.setBpm = (lvl) => {
    bpmValue = lvl;
    console.log(`beats per minute set to: ${lvl}bpm`);
    bpmLog.innerText = lvl;
}

window.setSteps = (lvl) => {
    totalSteps = lvl;
    console.log(`Step count has been changed to ${lvl} steps`)
    stepLog.innerText = lvl;
}

window.drumGen = (drumKit) => {
    drumKitLog.innerText = drumKit;
    loadedKit = drumKit;
    console.log(`selected drums: ${drumKit}`)

}

window.setDrumVol = (lvl) => {
    drumVolLevel = lvl;
    console.log(`drum volume set to: ${lvl}dB`)
    drumVolLog.innerText = lvl;
}

window.setMelVol = (lvl) => {
    melVolLevel = lvl;
    console.log(`Melody volume set to: ${lvl}dB`)
    melVolLog.innerText = lvl;
}

window.setReverb = (lvl) => {
    if (lvl == 0) {
        reverb.wet.value = 0;
        console.log(`set reverb to: off`);
        reverbLog.innerText = "off"
    } else {
        reverb.wet.value = lvl;
        console.log(`set reverb to: ${lvl}`);
        reverbLog.innerText = lvl;
    }
};

window.setDistortion = (lvl) => {
    if (lvl == 0) {
        
        dist.wet.value = 0;
        console.log(`set distortion to: off`);
        distLog.innerText = "off";
    } else {
        
        dist.wet.value = lvl;
        console.log(`set distortion to: ${lvl}`);
        distLog.innerText = lvl;
    }
};

window.setDelay = (lvl) => {
    if (lvl == 0) {
        delay.wet.value = 0;
        console.log(`set Delay to: off`);
        delayLog.innerText = "off";
    } else {
        delay.wet.value = lvl;
        console.log(`set Delay to: ${lvl}`);
        delayLog.innerText = lvl;
    }
}

window.setMelReverb = (lvl) => {
    if (lvl == 0) {
        melReverb.wet.value = 0;
        console.log(`set melody reverb to: off`);
        melRevLog.innerText = "off";
    } else {
        melReverb.wet.value = lvl;
        console.log(`set melody reverb to: ${lvl}`);
        melRevLog.innerText = lvl;
    }
};

window.setMelEffect = (lvl) => {
    if (lvl == 0) {
        melPhsr.wet.value = 0;
        console.log(`set melody phaser to: off`);
        melEffLog.innerText = "off";
    } else {
        melPhsr.wet.value = lvl;
        console.log(`set melody phaser to: ${lvl}`);
        melEffLog.innerText = lvl;
    }
};

// document.getElementById("goBack").addEventListener("click", () => {
//     location.href = "https://viblocks.herokuapp.com/user-dash/"
// })


console.log("load sucessful");