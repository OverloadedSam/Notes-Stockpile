console.log("Hello and welcome to the Note Stockpile!");
displayNotes();

let addNoteBtn = document.getElementById("addNoteBtn");
let noteText = document.getElementById("noteText");

// Add notes to local storage
addNoteBtn.addEventListener("click", () => {
    let savedNotesArr;
    let savedNotes = localStorage.getItem("savedNotes");
    if (savedNotes == null) {
        savedNotesArr = [];
    } else {
        savedNotesArr = JSON.parse(savedNotes);
    }

    if (noteText.value.trim() == "") {
        alert("Note is empty!");
        noteText.value = "";
    } else {
        savedNotesArr.push(noteText.value);
        localStorage.setItem("savedNotes", JSON.stringify(savedNotesArr));
        noteText.value = "";
        displayNotes();
    }
});


//Displays the notes.
function displayNotes() {
    let savedNotes = localStorage.getItem("savedNotes");
    let savedNotesArr;
    if (savedNotes == null) {
        savedNotesArr = [];
    } else {
        savedNotesArr = JSON.parse(savedNotes);
    }

    let allNotesHTML = "";
    savedNotesArr.forEach((element, index) => {
        allNotesHTML += `
      <div class="container-fluid card my-2 mx-auto savedNotesElems" style="width: 18rem;" >
        <div class="card-body">
          <h5 class="card-title">Note no. ${index + 1} </h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="delNote(this.id)" class="btn btn-danger">Delete Note</button>
        </div>
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
    let decision = confirm(`You are about to delete Note no. ${parseInt(index) + 1} click "OK" to proceed.`);
    if (decision) {
        let savedNotes = localStorage.getItem("savedNotes");
        savedNotesArr = JSON.parse(savedNotes);
        savedNotesArr.splice(index, 1);
        localStorage.setItem("savedNotes", JSON.stringify(savedNotesArr));
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
