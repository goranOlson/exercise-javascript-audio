const playList = document.querySelector(".song-list");
playList.addEventListener('click', songClicked);


//--- Controller
const play = document.querySelector('.controller .play');
play.addEventListener('click', playClicked);

const paus = document.querySelector('.controller .paus');
paus.addEventListener('click', pausClicked);

const previous = document.querySelector('.controller .previous');
previous.addEventListener('click', playPreviousMelody);

const nextSong = document.querySelector('.controller .next');
nextSong.addEventListener('click', playNextMelody);

const btnRepeat = document.querySelector('.controller .repeat');
btnRepeat.addEventListener('click', repeatClicked);

const btnShuffle = document.querySelector('.controller .shuffle');
btnShuffle.addEventListener('click', shuffleClicked);

const progressor = document.querySelector('.box-controller .progressor');
progressor.addEventListener('click', progressorClick);
const progressBar = document.querySelector('.progress-bar');
const timeDuration = document.querySelector('.progress-time');
const audio = document.querySelector('audio');


let doRepeat = false;
let doShuffle = false;

let randomList = [];

function progressorClick(event) {
  
    const songLen = (audio) ? audio.duration : 0;

    if (songLen > 0) {
        const totWidth = progressor.offsetWidth;
        const procent = event.offsetX / totWidth;  // 180 / 320px => ~ 56%
        const seconds = songLen * procent;  // 300s * 56%
        // console.log('seconds: ' + seconds + ' (' + (procent * 100).toFixed(0) + '%)');
        
        audio.currentTime = seconds;
        audio.play();
    }
}

audio.onloadedmetadata = function() {
    // Set total length of melody: "02:42"

    // console.log('Time: ' + audio.duration + ' => "' + getTimeString(audio.duration) + '"');
    document.querySelector('.melody-lenght').innerText = createTimeString(audio.duration);
};

audio.addEventListener("timeupdate", function() {
    var currentTime = audio.currentTime;
    var duration = audio.duration;
    progressBar.style.width = progressor.offsetWidth * (currentTime / duration) + "px";

    const timePlayed = createTimeString(currentTime);  // "00:42"
    timeDuration.innerText = (currentTime != NaN) ? timePlayed : 0;
});

audio.addEventListener("ended", function() {
    // console.log('Song ended');

    let actItem = document.querySelector('.song-list .item.active');

    if (doRepeat) {  // Play next melody if exist, else first
        if (actItem.nextElementSibling) {
            actItem.nextElementSibling.click();
        }
        else {
            playList.children.item(0).click();
        }
    }
    else if (doShuffle) {
        // Create new random list if empty
        if (randomList.length === 0 ) {
            const actItem = document.querySelector('.song-list .item.active');
            const idx = findIndex(playList.children, actItem.dataset['melody']);

            randomList = createRandomList(playList.children.length, idx);
        }

        // Play next melody in playlist
        const nextId = randomList.shift();
        if (nextId >= 0) {
            playList.children.item(nextId).click();
        }
    }
    else {    // Play next melody if exists
        if (actItem.nextElementSibling) {
            actItem.nextElementSibling.click();
        }
        else {
            pausClicked();  // Hide paus button and show play button
        }
    }

    // Restore item icons
    actItem.children.item(2).classList.remove('hidden');  // play
    actItem.children.item(3).classList.add('hidden');  // paus
});

function songClicked(event) {
     console.log('--> songClicked()');

    let actItem = document.querySelector('.item.active');

    if (event) {
        const clickedItem = event.target.closest('.item');

        if (clickedItem != actItem) {
            // Restore previous melody if exitst
            if (actItem) {
                actItem.classList.remove('active');
                actItem.children.item(2).classList.remove('hidden');  // play
                actItem.children.item(3).classList.add('hidden');  // paus
            }

            // Make clickedItem the active item!
            clickedItem.classList.add('active');

            // Set player image, texts
            document.querySelector('.player .box-image').classList.add('active');
            document.querySelector('.player .box-image img').classList.add('active');
            document.querySelector('.player .song').classList.add('active');
            document.querySelector('.player .progressor').classList.add('active');
            document.querySelector('.player .progress').classList.add('active');
            document.querySelector('.player .controller').classList.add('active');

            // Set audio melody
            audio.src = 'assets/' + clickedItem.getAttribute("data-melody");

            // Set played melody information
            document.querySelector('.player img').src = clickedItem.children[0].src;
            document.querySelector('.player .artist').innerText = clickedItem.querySelector('.artist').innerText;
            document.querySelector('.player .melody').innerText = clickedItem.querySelector('.melody').innerText;

            // Play melody
            playClicked();
            
            // Update active item to handle item icons below
            actItem = document.querySelector('.item.active');
        }
        else {  //--- Active item clicked - paus or play
            if (audio.paused) {
                playClicked();
            }
            else {
                pausClicked();
            }
        }
    }

    //--- Set item icons
    if (audio.paused) {
        actItem.children.item(2).classList.remove('hidden');  // play
        actItem.children.item(3).classList.add('hidden');  // paus
    }
    else {
        actItem.children.item(2).classList.add('hidden');  // play
        actItem.children.item(3).classList.remove('hidden');  // paus
    }
}

function playClicked(event = null) {
    //  console.log('--> playClicked()');

    const actItem = document.querySelector('.song-list .item.active');

    if (actItem) {
        
        play.classList.remove('active');
        paus.classList.add('active');  // 
        audio.play();

        if (event) {  // Handle item icons
            songClicked();
        }
    }
}

function pausClicked(event) {
    // console.log('--> pausClicked()');
    const actItem = document.querySelector('.song-list .item.active');

    if (actItem) {
        paus.classList.remove('active');  // 
        play.classList.add('active');
        audio.pause();

        if (event) {  // Handle item icons
            songClicked();
        }
        
    }
}

function playPreviousMelody(event) {
    // console.log('clicked previous');
    const actItem = document.querySelector('.item.active');

    if (actItem) {
        if (actItem.previousElementSibling) {
            actItem.previousElementSibling.click();
        }
        else {
            if (playList.children.length >= 2) {
                playList.children.item( playList.children.length - 1 ).click();
            }
        }
    }
}

function playNextMelody(event) {
    // console.log('clicked next');
    const actItem = document.querySelector('.item.active');

    if (actItem) {
        if (actItem.nextElementSibling) {
            actItem.nextElementSibling.click();
        }
        else {
            // Most be anoter melody then the playing to switch to...
            if (playList.children.length >= 2) {
                playList.children.item(0).click();
            }
        }
    }
}

function repeatClicked(event = null) {
    if (document.querySelector('.item.active')) {  // Must have active melody
        if (event && !doRepeat) {  // Set doRepeat
            doRepeat = true;
            btnRepeat.classList.add('active');
            shuffleClicked();  // Stop shuffle
        }
        else {
            doRepeat = false;
            btnRepeat.classList.remove('active');
        }
    }
}

function shuffleClicked(event) {
    if (document.querySelector('.item.active')) {  // Must have active melody
        if (event && !doShuffle) {  // Set doShuffle
            doShuffle = true;
            btnShuffle.classList.add('active');
            repeatClicked();  // stop repeat
        }
        else {
            doShuffle = false;
            btnShuffle.classList.remove('active');
        }
    }
}

function createTimeString(seconds) {
    return new Date(seconds * 1000).toISOString().slice(14, 19);
}

function findIndex(htmlCollection, string) {
    let index = -1;

    for (let i = 0; i < htmlCollection.length; i++) {
        if (htmlCollection[i].dataset['melody'] === string) {
            index = i;
            break;
        }
    }

    return index;
}

function createRandomList(length, notNbr = -1) {
    const arr = [];

    // Create list of unique numbers [0 - length]
    while(arr.length < length){
        const nbr = Math.floor(Math.random() * length);  //  + 1  // Starts with '0'
        const idx = arr.indexOf(nbr);

        if(arr.indexOf(nbr) === -1) {
            arr.push(nbr);
        } 
    }
    
    // Remove notNbr, if set, from array
    if (notNbr >= 0) {
        arr.splice( arr.indexOf(notNbr), 1);
    }

    return arr;
}