const audio = document.querySelector('audio');

const playList = document.querySelector(".song-list");
playList.addEventListener('click', songClicked);


//--- Controller
const play = document.querySelector('.controller .play');
play.addEventListener('click', playClicked);

const paus = document.querySelector('.controller .paus');
paus.addEventListener('click', pausClicked);

const btnRepeat = document.querySelector('.controller .repeat');
btnRepeat.addEventListener('click', repeatClicked);
 console.log(btnRepeat);


// const audio = new Audio();
//  console.log(audio);

// audio.src = "assets/Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.mp3"; 
// audio.play();

function songClicked(event) {
    // console.log(event.target);
    console.log(event.currentTarget);
    const item = event.target.closest('.item');
     console.log(item);
    // Running?
    // mp3
    // active item
    // image/text/
    // box-image.img.src = item.childNode[0].src;
    
    // Update player
    document.querySelector('.player img').src = item.children[0].src;
    document.querySelector('.player .artist').innerText = item.querySelector('.artist').innerText;
    document.querySelector('.player .album').innerText = item.querySelector('.melody').innerText;

    // getAttribute("data-melody")
    // console.log('melody: ' + item.getAttribute("data-melody"));
    audio.src = 'assets/' + item.getAttribute("data-melody");
    // console.log(audio.src);
    playClicked();
}

function controllerClicked(event) {
    console.log('--> controllerClicked() ' + event.target.classList);

    

}
function playClicked(event = null) {
     console.log('--> playClicked()');
     console.log(event);
    // item clicked || play clicked
    if (!event || audio.src) {   // progress | continue...
         console.log(audio.src);
        play.classList.remove('active');
        paus.classList.add('active');



    } else {
        console.log('No src!?');
    }
}
function pausClicked(event) {
    console.log('--> pausClicked()');
     console.log(event);
    audio.pause();
    paus.classList.remove('active');
    play.classList.add('active');

    
}



function repeatClicked(event) {
    
}




function findAncestor(element, className) {
    while ((element = element.parentElement) && !element.classList.contains(className));
    return element;
}

//=== TEST ===
// playClicked();