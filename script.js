const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.btn'); 

// Load saved notes from localStorage
function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
  attachDeleteEvents();  // Attach event listeners after loading
}
showNotes();

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

// Create a new note
createBtn.addEventListener("click", function makeNote(){
  let inputBox = document.createElement('p');
  let img = document.createElement('img');

  inputBox.className = 'input-box';
  inputBox.setAttribute('contenteditable', 'true');
  inputBox.innerText = "New Note";  // Placeholder text

  img.src = 'images/delete.png';
  img.style.cursor = 'pointer';
  img.className = 'delete-btn';

  inputBox.appendChild(img);
  notesContainer.appendChild(inputBox);

  updateStorage();  // Save notes after adding
  attachDeleteEvents();  // Attach event to new delete button
});

// Function to attach delete button events
function attachDeleteEvents() {
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = function () {
      this.parentElement.remove();
      updateStorage();
    };
  });

  document.querySelectorAll('.input-box').forEach(note => {
    note.onkeyup = function () {
      updateStorage();
    };
  });
}

// Prevent Enter key from creating a new paragraph
document.addEventListener("keydown", (event) => {
  if (event.key === 'Enter') {
    document.execCommand('insertLineBreak');
    event.preventDefault();
  }
});
