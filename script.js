let createBtn = document.querySelector(".create-btn")
createBtn.addEventListener('click', function () {
    createNewDiv();
})

let allNotes = document.querySelector('.allnotes')

function createNewDiv() {
    let newdiv = document.createElement('p')
    let img = document.createElement('img')
    img.src = "delete.png"

    newdiv.classList.add('new-div');

    let inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.setAttribute("contenteditable", "true");

    newdiv.appendChild(inputBox).append(img);
    allNotes.appendChild(newdiv)

    inputBox.focus();
    updateStorage();

}

function showNotes() {
    let notesArray = JSON.parse(localStorage.getItem("notes")) || [];

    // Set innerHTML by joining the array elements
    allNotes.innerHTML = notesArray.join('');
}
showNotes()


function updateStorage() {
    let notesArray = Array.from(allNotes.children).map(child => child.outerHTML);
    localStorage.setItem("notes", JSON.stringify(notesArray));
}


allNotes.addEventListener('click', function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage()
    }
    else if (e.target.tagName === 'p') {
        notes = document.querySelectorAll('.new-div')
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();
            }
        });
    }
})

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak")
        event.preventDefault();
    }
})