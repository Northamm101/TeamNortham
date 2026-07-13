const monthInformation = {
  "10": {
    id: "october",
    name: "October",
    year: "2026"
  },
  "11": {
    id: "november",
    name: "November",
    year: "2026"
  },
  "12": {
    id: "december",
    name: "December",
    year: "2026"
  },
  "01": {
    id: "january",
    name: "January",
    year: "2027"
  },
  "02": {
    id: "february",
    name: "February",
    year: "2027"
  },
  "03": {
    id: "march",
    name: "March",
    year: "2027"
  }
};

function createGameRow(game) {
  const isTeamNorthamGame =
    game.teamA === teamNorthamNumber ||
    game.teamB === teamNorthamNumber;

  const rowClass = isTeamNorthamGame
    ? ' class="team-northam-row"'
    : "";

  let winnerText = "—";

  if (game.resultType === "tie") {
    winnerText = "Tie";
  } else if (game.resultType === "rescheduled") {
    winnerText = game.winner
      ? `Team ${game.winner}*`
      : "—*";
  } else if (game.resultType === "default") {
    winnerText = game.winner
      ? `Team ${game.winner}*`
      : "—";
  } else if (game.winner) {
    winnerText = `Team ${game.winner}`;
  }

  return `
    <tr${rowClass}>
      <td class="sheet-cell">${game.sheet}</td>
      <td>Team ${game.teamA} vs Team ${game.teamB}</td>
      <td>${winnerText}</td>
    </tr>
  `;
}

function createSpecialGameNotes(week) {
  const allGames = [
    ...(week.earlyGames || []),
    ...(week.lateGames || [])
  ];

  const notes = [];

  allGames.forEach((game) => {
    if (
      game.resultType === "default" &&
      game.winner
    ) {
      notes.push(
        `* Team ${game.winner} winner by Default`
      );
    }

    if (game.resultType === "rescheduled") {
      if (game.rescheduledDisplayDate) {
        notes.push(
          `* Game Rescheduled to ${game.rescheduledDisplayDate}`
        );
      } else {
        notes.push(
          "* Game to be Rescheduled"
        );
      }
    }
  });

  if (notes.length === 0) {
    return "";
  }

  return `
    <div class="schedule-special-notes">
      ${notes
        .map((note) => `<p>${note}</p>`)
        .join("")}
    </div>
  `;
}

function createDrawSection(drawName, drawTime, games, drawType) {
  const badgeClass =
    drawType === "early"
      ? "early-draw-badge"
      : "late-draw-badge";

  return `
    <section class="draw-section">
      <div class="draw-heading">
        <div>
          <span class="draw-label">${drawName}</span>
          <h3>${drawTime}</h3>
        </div>

        <span class="draw-badge ${badgeClass}">
          ${drawType === "early" ? "Early" : "Late"}
        </span>
      </div>

      <div class="schedule-table-wrapper">
        <table class="schedule-table">
          <thead>
            <tr>
              <th scope="col">Sheet</th>
              <th scope="col">Matchup</th>
              <th scope="col">Winner</th>
            </tr>
          </thead>

          <tbody>
            ${games.map(createGameRow).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function createScheduleCard(week, weekNumber) {
  const dateParts = week.date.split("-");
  const monthNumber = dateParts[1];
  const dayNumber = dateParts[2];

  const monthName =
    monthInformation[monthNumber]?.name
      .slice(0, 3)
      .toUpperCase() || "";

  const fiftyFiftyHighlightClass =
  week.fiftyFiftyTeam === teamNorthamNumber
    ? " team-northam-fifty-fifty"
    : "";

const fiftyFiftyMarkup = week.fiftyFiftyTeam
  ? `
    <div class="fifty-fifty-banner compact-fifty-fifty${fiftyFiftyHighlightClass}">
      <span>
        50/50 Team:
        <strong>Team ${week.fiftyFiftyTeam}</strong>
      </span>
    </div>
  `
  : `
    <div class="fifty-fifty-banner compact-fifty-fifty no-fifty-fifty">
      <span>No 50/50 this week</span>
    </div>
  `;

  const specialGameNotes =
    createSpecialGameNotes(week);

  return `
    <article class="schedule-card">
      <div class="schedule-card-header">
        <div>
          <p class="schedule-week-label">Week ${weekNumber}</p>
          <h2>${week.displayDate}</h2>
        </div>

        <div class="date-badge" aria-hidden="true">
          <span>${monthName}</span>
          <strong>${dayNumber}</strong>
        </div>
      </div>

      ${fiftyFiftyMarkup}

      ${createDrawSection(
        "Early Draw",
        week.earlyTime,
        week.earlyGames,
        "early"
      )}

      ${createDrawSection(
        "Late Draw",
        week.lateTime,
        week.lateGames,
        "late"
      )}
      
      ${specialGameNotes}

      <a class="back-to-top-link" href="#top">
        Back to top
        <span aria-hidden="true">↑</span>
      </a>
    </article>
  `;
}

function renderLeagueSchedule() {
  const scheduleContainer =
    document.getElementById("league-schedule-container");

  if (!scheduleContainer) {
    return;
  }

  const groupedSchedule = {};

  leagueSchedule.forEach((week, index) => {
    const monthNumber = week.date.split("-")[1];

    if (!groupedSchedule[monthNumber]) {
      groupedSchedule[monthNumber] = [];
    }

    groupedSchedule[monthNumber].push({
      ...week,
      weekNumber: index + 1
    });
  });

  const monthOrder = [
    "10",
    "11",
    "12",
    "01",
    "02",
    "03"
  ];

  scheduleContainer.innerHTML = monthOrder
    .map((monthNumber) => {
      const month = monthInformation[monthNumber];
      const weeks = groupedSchedule[monthNumber] || [];

      if (weeks.length === 0) {
        return `
          <section
            class="schedule-month empty-schedule-month"
            id="${month.id}"
          >
            <div class="month-heading">
              <span>${month.name}</span>
              <strong>${month.year}</strong>
            </div>

            <div class="schedule-placeholder">
              <p>Schedule will be added here.</p>
            </div>
          </section>
        `;
      }

      return `
        <section class="schedule-month" id="${month.id}">
          <div class="month-heading">
            <span>${month.name}</span>
            <strong>${month.year}</strong>
          </div>

          ${weeks
            .map((week) =>
              createScheduleCard(
                week,
                week.weekNumber
              )
            )
            .join("")}
        </section>
      `;
    })
    .join("");
}

applyWeeklyResultsToLeagueSchedule();
renderLeagueSchedule();
