// ---------- SAVE DATA ----------
function saveData() {

    const rows = document.querySelectorAll("#tracker .row:not(.header):not(.total-row)");
    const data = [];

    rows.forEach(row => {

        const name = row.querySelector(".task").textContent;

        const days = [];
        row.querySelectorAll(".button").forEach(button => {
            days.push(button.classList.contains("active") ? 1 : 0);
        });

        data.push({
            name: name,
            days: days
        });

    });

    localStorage.setItem("habitTracker", JSON.stringify(data));

}

// ---------- HIGHLIGHT TODAY ----------
function highlightToday() {

    const today = new Date().getDay();

    // Map JS day numbers to your header labels
    const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    const todayName = dayNames[today];

    const headerCells = document.querySelectorAll(".header .cell");

    headerCells.forEach(cell => {

        if (cell.textContent === todayName) {
            cell.classList.add("today");
        } else {
            cell.classList.remove("today");
        }

    });

}

// ---------- DISPLAY CURRENT DATE ----------
function displayCurrentDate() {

    const today = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const formattedDate = today.toLocaleDateString(undefined, options);

    document.getElementById("currentDate").textContent = formattedDate;

    highlightToday();

}

// ---------- UPDATE DATE AT MIDNIGHT ----------
function scheduleMidnightUpdate() {

    const now = new Date();

    const midnight = new Date();
    midnight.setHours(24,0,0,0);

    const timeUntilMidnight = midnight - now;

    setTimeout(() => {

        displayCurrentDate();
        scheduleMidnightUpdate();

    }, timeUntilMidnight);

}

// ---------- UPDATE ROW SCORE ----------
function updateScore(row) {

    const buttons = row.querySelectorAll(".button");
    const scoreCell = row.querySelector(".score");

    let score = 0;

    buttons.forEach(button => {
        if (button.classList.contains("active")) {
            score++;
        }
    });

    scoreCell.textContent = score;

    updateGrandTotal();
    saveData();
}


// ---------- UPDATE GRAND TOTAL ----------
function updateGrandTotal() {

    const scores = document.querySelectorAll(".score");

    let total = 0;

    scores.forEach(score => {
        total += parseInt(score.textContent);
    });

    total += otherValue;

    document.getElementById("grandTotal").textContent = total;
}


// ---------- CREATE NEW ROW ----------
function createNewRow(taskName = "New Task") {

    const tracker = document.getElementById("tracker");

    const row = document.createElement("div");
    row.classList.add("row");

    // Task name cell
    const taskCell = document.createElement("div");
    taskCell.classList.add("cell", "task");
    taskCell.textContent = taskName;
    row.appendChild(taskCell);

    // Day buttons
    for (let i = 0; i < 7; i++) {

        const button = document.createElement("div");
        button.classList.add("cell", "button");

        button.addEventListener("click", () => {

            button.classList.toggle("active");
            updateScore(row);

        });

        row.appendChild(button);
    }

    // Score cell
    const scoreCell = document.createElement("div");
    scoreCell.classList.add("cell", "score");
    scoreCell.textContent = "0";

    row.appendChild(scoreCell);

    tracker.insertBefore(row, document.querySelector(".total-row"));

    return row;
}

// ---------- LOAD SAVED DATA ----------
function loadData() {

    const saved = localStorage.getItem("habitTracker");

    if (!saved) return;

    const tracker = document.getElementById("tracker");

    // Remove all existing task rows first
    document.querySelectorAll("#tracker .row:not(.header):not(.total-row)").forEach(row => {
        row.remove();
    });

    const data = JSON.parse(saved);

    data.forEach(task => {

        const row = createNewRow(task.name);

        const buttons = row.querySelectorAll(".button");

        task.days.forEach((value, i) => {

            if (value === 1) {
                buttons[i].classList.add("active");
            }

        });

        updateScore(row);

    });

    // ---------- LOAD OTHER COUNTER ----------
    const savedOther = localStorage.getItem("otherCounter");

    if (savedOther !== null) {
        otherValue = parseInt(savedOther);
        document.getElementById("otherCount").textContent = otherValue;
    }
    
    updateGrandTotal();

}


// ---------- ADD ROW BUTTON ----------
document.getElementById("addRow").addEventListener("click", () => {

    createNewRow();
    saveData();

});

// ---------- RESET WEEK BUTTON ----------
const resetButton = document.getElementById("reset-week");

resetButton.addEventListener("click", () => {
    const rows = document.querySelectorAll("#tracker .row:not(.header):not(.total-row)");

    rows.forEach(row => {
        const buttons = row.querySelectorAll(".button");
        buttons.forEach(btn => btn.classList.remove("active"));
        updateScore(row); // update individual row score and grand total
    });

    otherValue = 0;
    document.getElementById("otherCount").textContent = 0;

    // Save the reset state
    saveData();
});


// ---------- EDIT TASK NAME ----------
document.getElementById("tracker").addEventListener("click", function(e) {

    if (!e.target.classList.contains("task")) return;

    const cell = e.target;
    const currentText = cell.textContent;

    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;

    cell.textContent = "";
    cell.appendChild(input);

    input.focus();

    input.addEventListener("blur", () => {

        cell.textContent = input.value || currentText;
        saveData();

    });

    input.addEventListener("keydown", e => {

        if (e.key === "Enter") {
            input.blur();
        }

    });

});

// ---------- OTHER COUNTER ----------
let otherValue = 0;

const otherCount = document.getElementById("otherCount");
const otherPlus = document.getElementById("otherPlus");
const otherMinus = document.getElementById("otherMinus");

otherPlus.addEventListener("click", () => {

    otherValue++;

    otherCount.textContent = otherValue;

    localStorage.setItem("otherCounter", otherValue);

    updateGrandTotal();

});

otherMinus.addEventListener("click", () => {

    if (otherValue > 0) {

        otherValue--;

        otherCount.textContent = otherValue;

        localStorage.setItem("otherCounter", otherValue);

        updateGrandTotal();

    }

});

// ---------- INITIAL LOAD ----------
window.addEventListener("DOMContentLoaded", () => {

    loadData();

    displayCurrentDate();

    highlightToday();

    scheduleMidnightUpdate();

});
