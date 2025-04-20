function loadHabits() {
    const habits = JSON.parse(localStorage.getItem("habits")) || [];
    const habitBody = document.getElementById("habitBody");
    habitBody.innerHTML = "";

    habits.forEach((habit, i) => {
        const row = document.createElement("tr");

        const cell = document.createElement("td");
        cell.textContent = habit.name;
        row.appendChild(cell);

        for (let j = 0; j < 7; j++) {
            const td = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = habit.days[j];
            checkbox.onchange = () => {
                habit.days[j] = checkbox.checked;
                localStorage.setItem("habits", JSON.stringify(habits));
                loadHabits(); // Refresh streak
            };
            td.appendChild(checkbox);
            row.appendChild(td);
        }

        // Streak calculation
        let streak = 0;
        for (let k = 0; k < 7; k++) {
            if (habit.days[k]) {
                streak++;
            } else {
                break;
            }
        }

        const streakCell = document.createElement("td");
        streakCell.textContent = `${streak} 🔥`;
        row.appendChild(streakCell);

        habitBody.appendChild(row);
    });
}

function addHabit() {
    const input = document.getElementById("habitInput");
    const habitName = input.value.trim();
    if (!habitName) return;
    const habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits.push({ name: habitName, days: Array(7).fill(false) });
    localStorage.setItem("habits", JSON.stringify(habits));
    input.value = "";
    loadHabits();
}

window.onload = loadHabits;

document.getElementById("toggleDarkMode").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

window.onload = () => {
    loadHabits();
    const isDark = JSON.parse(localStorage.getItem("darkMode"));
    if (isDark) {
        document.body.classList.add("dark-mode");
    }
};
