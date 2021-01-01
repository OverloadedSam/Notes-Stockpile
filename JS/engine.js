console.log("Hello and welcome to the Note Stockpile!");
displayNotes();

let addNoteBtn = document.getElementById("addNoteBtn");
let noteText = document.getElementById("noteText");
let titleText = document.getElementById("titleText");
titleText.value = "Title";
// console.log(titleText);

// Add notes to local storage
addNoteBtn.addEventListener("click", () => {
    let savedNotesArr;
    let savedTitles;
    let titles = localStorage.getItem("savedTitles");
    let savedNotes = localStorage.getItem("savedNotes");
    if (savedNotes == null) {
        savedNotesArr = [];
        savedTitles = [];
    } else {
        savedNotesArr = JSON.parse(savedNotes);
        if (titles == null) {
            savedTitles = [];
        }
        else {
            savedTitles = JSON.parse(titles);
        }
    }

    if (noteText.value.trim() == "" || titleText.value.trim() == "") {
        alert("🚫 Note or Title is empty! 🚫");
        noteText.value = "";
        titleText.value = "Title";
    } else {
        savedTitles.push(titleText.value);
        savedNotesArr.push(noteText.value);
        localStorage.setItem("savedNotes", JSON.stringify(savedNotesArr));
        localStorage.setItem("savedTitles", JSON.stringify(savedTitles));
        noteText.value = "";
        titleText.value = "Title";
        displayNotes();
    }
});


//Displays the notes.
function displayNotes() {
    let savedTitles;
    let savedNotesArr;
    let titles = localStorage.getItem("savedTitles");
    let savedNotes = localStorage.getItem("savedNotes");
    if (savedNotes == null) {
        savedNotesArr = [];
        savedTitles = [];
    } else {
        savedNotesArr = JSON.parse(savedNotes);
        if (titles == null) {
            savedTitles = [];
        } else {
            savedTitles = JSON.parse(titles);
        }
    }

    let allNotesHTML = "";
    savedNotesArr.forEach((element, index) => {
        const T = savedTitles[index];
        allNotesHTML += `
      <div class="container-fluid card my-2 mx-auto savedNotesElems" style="width: 18rem;" >
        <div class="card-body">
          <h5 class="card-title"> ${T} </h5>
        </div>
        <div class="scrollable">
          <p class="card-text scrollable">${element}</p>
        </div>         
        <button id="${index}" onclick="delNote(this.id)" class="btn btn-danger my-3">Delete Note</button>
      </div>`;
    });

    let notesArea = document.getElementById("notesArea");
    if (savedNotesArr.length != 0) {
        notesArea.innerHTML = allNotesHTML;
    } else {
        notesArea.innerHTML = `<b><i>Looks like you haven't saved a note yet. Try to type your note and click "Save Note" button to save!</i></b>`;
    }
}

// Deletes a saved note from the local storage
function delNote(index) {
    let savedTitles = JSON.parse(localStorage.getItem("savedTitles"));
    let decision = confirm(`⚠️ You are about to delete "${savedTitles[parseInt(index)]}".\nClick 'OK' to proceed.`);
    if (decision) {
        let savedNotes = localStorage.getItem("savedNotes");
        let titles = localStorage.getItem("savedTitles");
        savedNotesArr = JSON.parse(savedNotes);
        savedTitles = JSON.parse(titles);
        savedNotesArr.splice(index, 1);
        savedTitles.splice(index, 1);
        localStorage.setItem("savedNotes", JSON.stringify(savedNotesArr));
        localStorage.setItem("savedTitles", JSON.stringify(savedTitles));
    }
    displayNotes();
}


let searchEle = document.getElementById("search");
// Searches notes that matches to the search term and displays them
searchEle.addEventListener("input", () => {
    let searchTerm = search.value.toLowerCase();
    let searchRes = document.getElementsByClassName("savedNotesElems");

    //Search logic to filter notes.
    Array.from(searchRes).forEach((element) => {
        let notetxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (searchTerm == "") {
            displayNotes();
        } else if (notetxt.includes(searchTerm)) {
            element.style.border = "2px solid red";
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});
