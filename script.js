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
  const ud = document.createElement('img');

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
document.querySelector(".underline-btn").addEventListener("click", () => {
  let selection = window.getSelection();
  if (!selection.rangeCount) return;

  let range = selection.getRangeAt(0);
  let selectedText = selection.toString();
  
  if (!selectedText.trim()) return; // Prevent empty selection

  let parent = selection.anchorNode.parentNode;

  // If text is already underlined, remove <u>
  if (parent.tagName === "U") {
      let textNode = document.createTextNode(parent.innerText);
      parent.replaceWith(textNode);
  } else {
      let span = document.createElement("u");
      span.textContent = selectedText;
      range.deleteContents();
      range.insertNode(span);
  }
});

document.querySelector(".copy-btn").addEventListener("click", () => {
  let selectedText = window.getSelection().toString();
  
  if (selectedText.trim()) { // Ensure there's text selected
      navigator.clipboard.writeText(selectedText).then(() => {
          
      });
  } else {
    
  }
});
document.querySelector(".italic-btn").addEventListener("click", () => {
  let selection = window.getSelection();
  if (!selection.rangeCount) return;

  let range = selection.getRangeAt(0);
  let selectedText = selection.toString();
  
  if (!selectedText.trim()) return; // Prevent empty selection

  let parent = selection.anchorNode.parentNode;

  // If text is already italic, remove <i>
  if (parent.tagName === "I") {
      let textNode = document.createTextNode(parent.innerText);
      parent.replaceWith(textNode);
  } else {
      let span = document.createElement("i");
      span.textContent = selectedText;
      range.deleteContents();
      range.insertNode(span);
  }
});
document.querySelector(".bold-btn").addEventListener("click", () => {
  let selection = window.getSelection();
  if (!selection.rangeCount) return;

  let range = selection.getRangeAt(0);
  let selectedText = selection.toString();
  
  if (!selectedText.trim()) return; // Prevent empty selection

  let parent = selection.anchorNode.parentNode;

  // If text is already bold, remove <b>
  if (parent.tagName === "B" || parent.tagName === "STRONG") {
      let textNode = document.createTextNode(parent.innerText);
      parent.replaceWith(textNode);
  } else {
      let boldElement = document.createElement("b");
      boldElement.textContent = selectedText;
      range.deleteContents();
      range.insertNode(boldElement);
  }
});
