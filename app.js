// Piano Notes Data
const notes = [
  { note: "C", color: "white" },
  { note: "C#", color: "black" },
  { note: "D", color: "white" },
  { note: "D#", color: "black" },
  { note: "E", color: "white" },
  { note: "F", color: "white" },
  { note: "F#", color: "black" },
  { note: "G", color: "white" },
  { note: "G#", color: "black" },
  { note: "A", color: "white" },
  { note: "A#", color: "black" },
  { note: "B", color: "white" }
];

// Lessons with highlighted keys
const lessons = [
  {
    title: "Lesson 1: Piano Overview",
    content: `
      <p>Welcome to the piano! It has white and black keys. White keys are natural notes, black keys are sharps/flats.</p>
      <p>Try pressing keys in practice to hear their sounds.</p>`,
    highlightedNotes: []
  },
  {
    title: "Lesson 2: Finger Placement",
    content: `
      <p>Place your right thumb on the middle C (the white key near the middle).</p>
      <p>Use fingers 1-5 for the white keys going right.</p>`,
    highlightedNotes: ["C", "D", "E", "F", "G"]
  },
  {
    title: "Lesson 3: Reading Notes",
    content: `
      <p>Learn to read music notes like C, D, E, F, G on the piano.</p>
      <p>Try playing simple songs in the Songs tab.</p>`,
    highlightedNotes: ["C", "D", "E", "F", "G"]
  }
];

// Elements
const lessonListEl = document.getElementById("lesson-list");
const lessonContentEl = document.getElementById("lesson-content");
const prevBtn = document.getElementById("prev-lesson");
const nextBtn = document.getElementById("next-lesson");
const pianoEl = document.getElementById("piano");
const volumeSlider = document.getElementById("volume");

let currentLessonIndex = 0;
let volume = 0.5;

// Create piano keys
function createPiano() {
  pianoEl.innerHTML = "";
  notes.forEach(({ note, color }) => {
    const key = document.createElement("div");
    key.classList.add("key");
    if (color === "black") key.classList.add("black");
    key.dataset.note = note;
    key.textContent = note;

    // Sound audio element
    const audio = document.createElement("audio");
    audio.src = `sounds/${note}.mp3`;
    audio.id = `audio-${note}`;
    audio.volume = volume;
    key.appendChild(audio);

    // Click play sound
    key.addEventListener("click", () => {
      playNote(note);
      animateKey(key);
    });

    pianoEl.appendChild(key);
  });
}

// Play a note sound
function playNote(note) {
  const audio = document.getElementById(`audio-${note}`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.volume = volume;
  audio.play();
}

// Animate key press
function animateKey(key) {
  key.classList.add("pressed");
  setTimeout(() => key.classList.remove("pressed"), 150);
}

// Highlight lesson keys
function highlightLessonKeys(notesToHighlight) {
  const allKeys = document.querySelectorAll("#piano .key");
  allKeys.forEach(key => key.classList.remove("highlight"));
  notesToHighlight.forEach(note => {
    const keyEl = [...allKeys].find(k => k.dataset.note === note);
    if (keyEl) {
      keyEl.classList.add("highlight");
    }
  });
}

// Load lessons list
function loadLessonList() {
  lessonListEl.innerHTML = "";
  lessons.forEach((lesson, index) => {
    const li = document.createElement("li");
    li.textContent = lesson.title;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => loadLesson(index));
    lessonListEl.appendChild(li);
  });
}

// Load lesson content and update UI
function loadLesson(index) {
  currentLessonIndex = index;
  lessonContentEl.innerHTML = `<h3>${lessons[index].title}</h3>${lessons[index].content}`;
  updateLessonButtons();
  highlightCurrentLesson();
  highlightLessonKeys(lessons[index].highlightedNotes);
}

// Highlight current lesson in the list
function highlightCurrentLesson() {
  const lis = lessonListEl.querySelectorAll("li");
  lis.forEach((li, idx) => {
    li.style.fontWeight = idx === currentLessonIndex ? "bold" : "normal";
    li.style.color = idx === currentLessonIndex ? "#ff6f61" : "#000";
  });
}

// Update navigation buttons
function updateLessonButtons() {
  prevBtn.disabled = currentLessonIndex === 0;
  nextBtn.disabled = currentLessonIndex === lessons.length - 1;
}

// Navigation handlers
prevBtn.addEventListener("click", () => {
  if (currentLessonIndex > 0) loadLesson(currentLessonIndex - 1);
});
nextBtn.addEventListener("click", () => {
  if (currentLessonIndex < lessons.length - 1) loadLesson(currentLessonIndex + 1);
});

// Volume control
volumeSlider.addEventListener("input", () => {
  volume = volumeSlider.value;
});

// Initialize app
function init() {
  createPiano();
  loadLessonList();
  loadLesson(0);
}

init();
