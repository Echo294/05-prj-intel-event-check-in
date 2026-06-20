alert("JS script loaded successfully!");

const attendeeNameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const checkInForm = document.getElementById("checkInForm");

const greeting = document.getElementById("greeting");
const attendeeCountDisplay = document.getElementById("attendeeCount");

const waterCountDisplay = document.getElementById("waterCount");
const zeroCountDisplay = document.getElementById("zeroCount");
const powerCountDisplay = document.getElementById("powerCount");

const progressBar = document.getElementById("progressBar");

const attendeeList = document.createElement("ul");
attendeeList.classList.add("attendee-list");
document.querySelector(".container").appendChild(attendeeList);

let totalCount = 0;
let teamCounts = {
  water: 0,
  zero: 0,
  power: 0,
};

const GOAL = 50;

function loadSavedData() {
  const savedTotal = localStorage.getItem("totalCount");
  const savedTeams = localStorage.getItem("teamCounts");
  const savedList = localStorage.getItem("attendeeList");

  if (savedTotal) totalCount = Number(savedTotal);
  if (savedTeams) teamCounts = JSON.parse(savedTeams);
  if (savedList) attendeeList.innerHTML = savedList;

  updateUI();
}

loadSavedData();

function saveData() {
  localStorage.setItem("totalCount", totalCount);
  localStorage.setItem("teamCounts", JSON.stringify(teamCounts));
  localStorage.setItem("attendeeList", attendeeList.innerHTML);
}

checkInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = attendeeNameInput.value.trim();
  const team = teamSelect.value;

  if (!name || !team) return;

  greeting.textContent = `Welcome, ${name}!`;

  totalCount++;
  teamCounts[team]++;
  addAttendeeToList(name, team);
  updateUI();
  saveData();
  checkForCelebration();

  attendeeNameInput.value = "";
  teamSelect.value = "";
});

function updateUI() {
  attendeeCountDisplay.textContent = totalCount;

  waterCountDisplay.textContent = teamCounts.water;
  zeroCountDisplay.textContent = teamCounts.zero;
  powerCountDisplay.textContent = teamCounts.power;

  updateProgressBar();
}

function updateProgressBar() {
  const percent = Math.min((totalCount / GOAL) * 100, 100);
  progressBar.style.width = percent + "%";
}

function checkForCelebration() {
  if (totalCount === GOAL) {
    const winningTeam = Object.entries(teamCounts).sort(
      (a, b) => b[1] - a[1],
    )[0][0];

    const teamNames = {
      water: "Team Water Wise",
      zero: "Team Net Zero",
      power: "Team Renewables",
    };

    alert(`🎉 Goal Reached! 🎉\nWinning Team: ${teamNames[winningTeam]}`);
  }
}

function addAttendeeToList(name, team) {
  const teamLabels = {
    water: "Water Wise",
    zero: "Net Zero",
    power: "Renewables",
  };

  const li = document.createElement("li");
  li.innerHTML = `<strong>${name}</strong> — ${teamLabels[team]}`;
  attendeeList.appendChild(li);
}
