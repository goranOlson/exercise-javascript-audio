const fileName = "./playlist.txt";  // => "playlist"
const storageName = fileName.substring(0, fileName.lastIndexOf('.'));
let melodyList;

// Import playlist from localStorage or else from file
if ( !importFromLocalStorage(storageName) ) {
    importFromFile(fileName);
}


function importFromFile(filename) {
    fetch(filename)
    .then(response => response.text())
    .then(data => {
        const lines = data.split("\n");
        const arr = lines.map(line => line.split("|")); 

        // Create html elements and write to localStorage
        createListItems(arr);
        writeLocalStorage(arr, storageName);
    })
    .catch(error => console.error("An error occurred:", error));
}

function writeLocalStorage(arr, storageName) {
    if (arr && storageName) {
        localStorage.setItem(storageName, JSON.stringify(arr));
    }
}

function importFromLocalStorage(storageName) {
    let success = false;
    let arr;

    if (storageName) {
        if ( (arr = JSON.parse( localStorage.getItem(storageName) ))) {
            // Create html elements
            createListItems(arr);
            success = true;
        }
    }

    return success;
}

function createListItems(lines) {
    if (lines) {
        // console.log('Importing playlist... ' + lines.length + ' pcs');
        const playList = document.querySelector('.song-list');
        
        for (const song of lines) {
            const item = `
            <div class="item" data-melody="${song[3]}">
                <img src="assets/${song[2]}" alt="${song[0]}/${song[1]}">
                <span class="info">
                    <span class="melody">${song[1]}</span>
                    <span class="artist">${song[0]}</span>
                </span>
                <span class="fas fa-play-circle play" title="Play"></span>
                <span class="fas fa-pause-circle paus hidden" title="Paus"></span>
            </div>`;
            
            playList.insertAdjacentHTML('beforeend', item);
        }
    }
}