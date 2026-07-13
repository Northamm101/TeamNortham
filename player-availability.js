function getWinnipegDateKey() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Winnipeg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const parts = formatter.formatToParts(new Date());
  const values = {};

  parts.forEach((part) => {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  });

  return `${values.year}-${values.month}-${values.day}`;
}

function createAvailabilityLines(entry) {
  const lines = [];

  const spares = entry.spares || [];
  const unavailable = entry.unavailable || [];
  const availableIfNeeded = entry.availableIfNeeded || [];
  const lastResort = entry.lastResort || [];

  spares.forEach((player) => {
    lines.push(
      `<p><strong>${player}</strong> — Spare</p>`
    );
  });

  unavailable.forEach((player) => {
    lines.push(
      `<p><strong>${player}</strong> — Unavailable</p>`
    );
  });

  if (spares.length === 0) {
    availableIfNeeded.forEach((player) => {
      lines.push(
        `<p><strong>${player}</strong> — Sitting - Available if Needed</p>`
      );
    });
  }

  lastResort.forEach((player) => {
    lines.push(
      `<p><strong>${player}</strong> — Last Resort</p>`
    );
  });

  return lines;
}

function renderPlayerAvailability() {
  const container = document.getElementById(
    "player-availability-container"
  );

  if (!container) {
    return;
  }

  if (
    typeof playerAvailability === "undefined" ||
    !Array.isArray(playerAvailability)
  ) {
    return;
  }

  const today = getWinnipegDateKey();

  const upcomingEntries = playerAvailability
    .filter((entry) => entry.date >= today)
    .sort((entryA, entryB) =>
      entryA.date.localeCompare(entryB.date)
    );

  if (upcomingEntries.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No upcoming availability updates have been added.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = upcomingEntries
    .map((entry) => {
      const lines = createAvailabilityLines(entry);

      if (lines.length === 0) {
        return "";
      }

      return `
        <div class="availability-item">
          <div>
            <strong>${entry.displayDate}</strong>
            <div class="availability-item-details">
              ${lines.join("")}
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

renderPlayerAvailability();