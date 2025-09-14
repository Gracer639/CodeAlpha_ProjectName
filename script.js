let flashcards = [
  { question: "What is JavaScript?", answer: "A programming language for the web" },
  { question: "What is HTML?", answer: "The standard markup language for web pages" },
  { question: "What is CSS?", answer: "A stylesheet language for designing web pages" }
];

let currentIndex = 0;
let showAnswer = false;
let editingIndex = null;

const cardText = document.getElementById("cardText");
const toggleBtn = document.getElementById("toggleBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");
const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");
const saveBtn = document.getElementById("saveBtn");
const formTitle = document.getElementById("formTitle");

function displayCard() {
  if (flashcards.length === 0) {
    cardText.textContent = "No flashcards available.";
    toggleBtn.style.display = "none";
    return;
  }
  const currentCard = flashcards[currentIndex];
  cardText.textContent = showAnswer ? currentCard.answer : currentCard.question;
  toggleBtn.textContent = showAnswer ? "Hide Answer" : "Show Answer";
  toggleBtn.style.display = "inline-block";
}

// Toggle show/hide answer
toggleBtn.addEventListener("click", () => {
  showAnswer = !showAnswer;
  displayCard();
});

// Next card
nextBtn.addEventListener("click", () => {
  if (flashcards.length > 0) {
    currentIndex = (currentIndex + 1) % flashcards.length;
    showAnswer = false;
    displayCard();
  }
});

// Previous card
prevBtn.addEventListener("click", () => {
  if (flashcards.length > 0) {
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    showAnswer = false;
    displayCard();
  }
});

// Delete card
deleteBtn.addEventListener("click", () => {
  if (flashcards.length > 0) {
    flashcards.splice(currentIndex, 1);
    currentIndex = 0;
    showAnswer = false;
    displayCard();
  }
});

// Edit card
editBtn.addEventListener("click", () => {
  if (flashcards.length > 0) {
    editingIndex = currentIndex;
    const card = flashcards[currentIndex];
    questionInput.value = card.question;
    answerInput.value = card.answer;
    formTitle.textContent = "Edit Flashcard";
    saveBtn.textContent = "Update Flashcard";
  }
});

// Add or Update flashcard
saveBtn.addEventListener("click", () => {
  const q = questionInput.value.trim();
  const a = answerInput.value.trim();
  if (!q || !a) return;

  if (editingIndex !== null) {
    flashcards[editingIndex] = { question: q, answer: a };
    editingIndex = null;
    formTitle.textContent = "Add New Flashcard";
    saveBtn.textContent = "Add Flashcard";
  } else {
    flashcards.push({ question: q, answer: a });
  }

  questionInput.value = "";
  answerInput.value = "";
  currentIndex = flashcards.length - 1;
  showAnswer = false;
  displayCard();
});

// Initialize
displayCard();
