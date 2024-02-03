const file = "playlist.txt";

fetch(file)
  .then(response => response.text())
  .then(data => {
    const lines = data.split("\n");
    const array = lines.map(line => line.split("|")); 
    createListItems(array);
  })
  .catch(error => console.error("An error occurred:", error));


function createListItems(lines) {
    // console.log('--> createListItems() ' + lines.length);
    
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
            </div>`;
            
            playList.insertAdjacentHTML('beforeend', item);
        }
    }
}