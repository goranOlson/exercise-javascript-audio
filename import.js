const fileName = "playlist.txt";  // => "playlist"
const storageName = fileName.substring(0, fileName.lastIndexOf('.'));
let melodyList;

if ( !(melodyList = readLocalStorage(storageName)) ) {  
    if ( (melodyList = importListFromFile(fileName)) ) {
        // Save to localStorage
        writeLocalStorage(melodyList, storageName);  
    }
}

if (melodyList) {
    createListItems(melodyList);
}
else {
    console.log("Could't find any playlist from local storage or file!?");
}

function importListFromFile(filename) {
    let arr;

    fetch(filename)
    .then(response => response.text())
    .then(data => {
        const lines = data.split("\n");
        arr = lines.map(line => line.split("|")); 
    })
    .catch(error => console.error("An error occurred:", error));

    return arr;
}

function writeLocalStorage(arr, storageName) {
    if (arr && storageName) {
        localStorage.setItem(storageName, JSON.stringify(arr));
    }
}

function readLocalStorage(storageName) {
    let arr;

    if (storageName) {
        arr = JSON.parse( localStorage.getItem(storageName) );
    }

    return arr;
}

function createListItems(lines) {
    if (lines) {
         console.log('Importing playlist... ' + lines.length + ' pcs');
        const playList = document.querySelector('.song-list');
        
        for (const song of lines) {
            const item = `
            <div class="item" data-melody="${song[3]}">
                <img src="assets/${song[2]}" alt="${song[0]}/${song[1]}">
                <span class="info">
                    <span class="melody">${song[1]}</span>
                    <span class="artist">${song[0]}</span>
                </span>
                <span class="fas fa-play-circle play"></span>
                <span class="fas fa-pause-circle paus hidden"></span>
            </div>`;
            
            playList.insertAdjacentHTML('beforeend', item);
        }
    }
}