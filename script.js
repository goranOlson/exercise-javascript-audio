const playList = document.querySelector(".song-list");
playList.addEventListener('click', songClicked);


//--- Controller
const play = document.querySelector('.controller .play');
play.addEventListener('click', playClicked);

const paus = document.querySelector('.controller .paus');
paus.addEventListener('click', pausClicked);

const previous = document.querySelector('.controller .previous');
previous.addEventListener('click', previousClicked);

const btnRepeat = document.querySelector('.controller .repeat');
btnRepeat.addEventListener('click', repeatClicked);

const progressor = document.querySelector('.box-controller .progressor');
const progressBar = document.querySelector('.progress-bar');
const timeDuration = document.querySelector('.progress-time');

const audio = document.querySelector('audio');




audio.onloadedmetadata = function() {
    // console.log('Time: ' + audio.duration);

    document.querySelector('.melody-lenght').innerText = getTimes(audio.duration);
};

audio.addEventListener("timeupdate", function() {
    var currentTime = audio.currentTime;
    var duration = audio.duration;

    
    // console.log('duration: ', (currentTime / duration));
    // console.log(currentTime, duration);
    
    progressBar.style.width = progressor.offsetWidth * (currentTime / duration) + "px";

    const timePlayed = getTimes(currentTime);
    timeDuration.innerText = (currentTime != NaN) ? timePlayed : 0;
});

audio.addEventListener("ended", function() {
    console.log('Song ended');
    // if (loop)
    // if (random)
    //
    const actItem = document.querySelector('.song-list .item.active');

    if (actItem.nextElementSibling) {
        console.log('Next song...' + actItem.nextElementSibling.children[1].innerText);

        actItem.classList.remove('active');
        actItem.nextElementSibling.click();
    }
});

// audio.onplay = function() {
//     console.log('onplay: ' + audio.duration);
// }




function songClicked(event) {
     console.log('--> songClicked()');
    // console.log(event.target);

    // Unactivate previous melody
    const itemBefore = document.querySelector('.item.active');
    if (itemBefore) {
        itemBefore.classList.remove('active');
    } 
    
    // Lighten up player
    if ( !itemBefore ) {
        document.querySelector('.player .song').classList.add('active');
        document.querySelector('.player .progress').classList.add('active');
        document.querySelector('.player .controller').classList.add('active');
    }
    
    // Show info about new melody
    const item = event.target.closest('.item');

    item.classList.add('active');
    // Set audio source
    audio.src = 'assets/' + item.getAttribute("data-melody");  
    // Update player
    document.querySelector('.player img').src = item.children[0].src;
    document.querySelector('.player .artist').innerText = item.querySelector('.artist').innerText;
    document.querySelector('.player .album').innerText = item.querySelector('.melody').innerText;
    
    playClicked();
}

function playClicked(event = null) {
     console.log('--> playClicked()');
    // console.log(event);
    // item clicked || play clicked
    if (!event || audio.src) {   // progress | continue...
        // console.log(audio.src);
        play.classList.remove('active');
        paus.classList.add('active');

        audio.play();
    }
}

function pausClicked(event) {
    console.log('--> pausClicked()');
    // console.log(event);
    paus.classList.remove('active');
    play.classList.add('active');

    audio.pause();
}

function previousClicked(event) {
     console.log('clicked previous');
    const actItem = document.querySelector('.item.active');

    if (actItem) {
        if (actItem.previousElementSibling) {
            actItem.previousElementSibling.click();
        }
        else {
            const allItems = document.querySelector('.song-list');

            // Most be anoter melody then the playing to switch to...
            if (allItems.children.length >= 2) {
                allItems.children.item( allItems.children.length - 1 ).click();
            }
        }
    }
     else {
        console.log('No actItem');
    }
}

function repeatClicked(event) {
    
}


function getTimes(seconds) {
    return new Date(seconds * 1000).toISOString().slice(14, 19);
}


//=== TEST ===
// playClicked();