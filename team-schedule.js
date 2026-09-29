const teamScheduleMonthInformation = {
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

function findTeamNorthamGame(week) {
  if (week.playoffPlaceholder) {
    return null;
  }

  const allGames = [
    ...(week.earlyGames || []).map((game) => ({
      ...game,
      drawName: "Early Draw",
      drawTime: week.earlyTime,
      drawType: "early"
    })),

    ...(week.lateGames || []).map((game) => ({
      ...game,
      drawName: "Late Draw",
      drawTime: week.lateTime,
      drawType: "late"
    }))
  ];

  return allGames.find(
    (game) =>
      game.teamA === teamNorthamNumber ||
      game.teamB === teamNorthamNumber
  );
}

function getOpponentNumber(game) {
  return game.teamA === teamNorthamNumber
    ? game.teamB
    : game.teamA;
}

function createTeamScheduleAvailabilityMarkup(date) {
  if (
    typeof playerAvailability === "undefined" ||
    !Array.isArray(playerAvailability)
  ) {
    return "";
  }

  const availabilityEntry = playerAvailability.find(
    (entry) => entry.date === date
  );

  if (!availabilityEntry) {
    return "";
  }

  const spares = availabilityEntry.spares || [];
  const unavailable =
    availabilityEntry.unavailable || [];

  const availableIfNeeded =
    availabilityEntry.availableIfNeeded || [];

  const lastResort =
    availabilityEntry.lastResort || [];

  const availabilityLines = [];

  spares.forEach((player) => {
    availabilityLines.push(
      `<p><strong>${player}</strong> — Spare</p>`
    );
  });

  unavailable.forEach((player) => {
    availabilityLines.push(
      `<p><strong>${player}</strong> — Unavailable</p>`
    );
  });

  if (spares.length === 0) {
    availableIfNeeded.forEach((player) => {
      availabilityLines.push(
        `<p><strong>${player}</strong> — Sitting - Available if Needed</p>`
      );
    });
  }

  lastResort.forEach((player) => {
    availabilityLines.push(
      `<p><strong>${player}</strong> — Last Resort</p>`
    );
  });

  if (availabilityLines.length === 0) {
    return "";
  }

  return `
    <div class="team-schedule-availability">
      <p class="detail-label">
        Player Availability
      </p>

      <div class="team-schedule-availability-list">
        ${availabilityLines.join("")}
      </div>
    </div>
  `;
}

function getTeamScheduleDateInformation(week) {
  const dateParts = week.date.split("-");
  const monthNumber = dateParts[1];
  const dayNumber = dateParts[2];

  const monthName =
    teamScheduleMonthInformation[monthNumber]?.name
      .slice(0, 3)
      .toUpperCase() || "";

  return {
    monthName,
    dayNumber
  };
}

function createTeamScheduleCard(
  week,
  weekNumber
) {
  const game = findTeamNorthamGame(week);

  if (!game) {
    return "";
  }

  const opponentNumber =
    getOpponentNumber(game);

  const {
    monthName,
    dayNumber
  } = getTeamScheduleDateInformation(week);

  const winnerText =
    game.resultType === "tie"
      ? "Tie"
      : game.winner
        ? `Team ${game.winner}`
        : "—";

  const resultClass =
    game.winner === null
      ? ""
      : game.winner === teamNorthamNumber
        ? " team-result-win"
        : " team-result-loss";

  const badgeClass =
    game.drawType === "early"
      ? "early-draw-badge"
      : "late-draw-badge";

  const fiftyFiftyHighlightClass =
    week.fiftyFiftyTeam === teamNorthamNumber
      ? " team-northam-fifty-fifty"
      : "";

  const fiftyFiftyMarkup =
    week.fiftyFiftyTeam
      ? `
        <div class="fifty-fifty-banner compact-fifty-fifty${fiftyFiftyHighlightClass}">
          <span>
            50/50 Team:
            <strong>
              Team ${week.fiftyFiftyTeam}
            </strong>
          </span>
        </div>
      `
      : `
        <div class="fifty-fifty-banner compact-fifty-fifty no-fifty-fifty">
          <span>
            No 50/50 this week
          </span>
        </div>
      `;

  const availabilityMarkup =
    createTeamScheduleAvailabilityMarkup(
      week.date
    );

  return `
    <article class="schedule-card team-game-card${resultClass}">
      <div class="schedule-card-header">
        <div>
          <p class="schedule-week-label">
            Week ${weekNumber}
          </p>

          <h2>${week.displayDate}</h2>
        </div>

        <div class="date-badge" aria-hidden="true">
          <span>${monthName}</span>
          <strong>${dayNumber}</strong>
        </div>
      </div>

      ${fiftyFiftyMarkup}

      <section class="draw-section">
        <div class="draw-heading">
          <div>
            <span class="draw-label">
              ${game.drawName}
            </span>

            <h3>${game.drawTime}</h3>
          </div>

          <span class="draw-badge ${badgeClass}">
            ${
              game.drawType === "early"
                ? "Early"
                : "Late"
            }
          </span>
        </div>

        <div class="team-game-details">
          <div class="team-game-detail">
            <span>Opponent</span>
            <strong>
              Team ${opponentNumber}
            </strong>
          </div>

          <div class="team-game-detail">
            <span>Sheet</span>
            <strong>
              Sheet ${game.sheet}
            </strong>
          </div>

          <div class="team-game-detail">
            <span>Winner</span>
            <strong>
              ${winnerText}
            </strong>
          </div>
        </div>
      </section>

      ${availabilityMarkup}

      <a class="back-to-top-link" href="#top">
        Back to top
        <span aria-hidden="true">↑</span>
      </a>
    </article>
  `;
}

function createTeamByeCard(
  week,
  weekNumber
) {
  const {
    monthName,
    dayNumber
  } = getTeamScheduleDateInformation(week);

  const fiftyFiftyHighlightClass =
    week.fiftyFiftyTeam === teamNorthamNumber
      ? " team-northam-fifty-fifty"
      : "";

  const fiftyFiftyMarkup =
    week.fiftyFiftyTeam
      ? `
        <div class="fifty-fifty-banner compact-fifty-fifty${fiftyFiftyHighlightClass}">
          <span>
            50/50 Team:
            <strong>
              Team ${week.fiftyFiftyTeam}
            </strong>
          </span>
        </div>
      `
      : `
        <div class="fifty-fifty-banner compact-fifty-fifty no-fifty-fifty">
          <span>
            No 50/50 this week
          </span>
        </div>
      `;

  return `
    <article class="schedule-card">
      <div class="schedule-card-header">
        <div>
          <p class="schedule-week-label">
            Week ${weekNumber}
          </p>

          <h2>${week.displayDate}</h2>
        </div>

        <div class="date-badge" aria-hidden="true">
          <span>${monthName}</span>
          <strong>${dayNumber}</strong>
        </div>
      </div>

      ${fiftyFiftyMarkup}

      <div class="fifty-fifty-banner compact-fifty-fifty team-northam-fifty-fifty">
        <span>
          <strong>
            TEAM NORTHAM — BYE WEEK
          </strong>
        </span>
      </div>

      <a class="back-to-top-link" href="#top">
        Back to top
        <span aria-hidden="true">↑</span>
      </a>
    </article>
  `;
}

function createTeamPlayoffPlaceholderCard(week) {
  const {
    monthName,
    dayNumber
  } = getTeamScheduleDateInformation(week);

  return `
    <article class="schedule-card">
      <div class="schedule-card-header">
        <div>
          <p class="schedule-week-label">
            Playoffs
          </p>

          <h2>${week.displayDate}</h2>
        </div>

        <div class="date-badge" aria-hidden="true">
          <span>${monthName}</span>
          <strong>${dayNumber}</strong>
        </div>
      </div>

      <div class="schedule-placeholder">
        <p>
          Team Northam playoff schedule
          will be added here.
        </p>
      </div>

      <a class="back-to-top-link" href="#top">
        Back to top
        <span aria-hidden="true">↑</span>
      </a>
    </article>
  `;
}

function renderTeamSchedule() {
  const scheduleContainer =
    document.getElementById(
      "team-schedule-container"
    );

  if (!scheduleContainer) {
    return;
  }

  const groupedSchedule = {};

  let regularSeasonWeekNumber = 0;

  leagueSchedule.forEach((week) => {
    const monthNumber =
      week.date.split("-")[1];

    if (!groupedSchedule[monthNumber]) {
      groupedSchedule[monthNumber] = [];
    }

    if (week.playoffPlaceholder) {
      groupedSchedule[monthNumber].push({
        ...week,
        cardType: "playoff",
        weekNumber: null
      });

      return;
    }

    regularSeasonWeekNumber += 1;

    const game = findTeamNorthamGame(week);

    if (game) {
      groupedSchedule[monthNumber].push({
        ...week,
        cardType: "game",
        weekNumber: regularSeasonWeekNumber
      });

      return;
    }

    if (
      week.byeTeam === teamNorthamNumber
    ) {
      groupedSchedule[monthNumber].push({
        ...week,
        cardType: "bye",
        weekNumber: regularSeasonWeekNumber
      });
    }
  });

  const monthOrder = [
    "10",
    "11",
    "12",
    "01",
    "02",
    "03"
  ];

  scheduleContainer.innerHTML =
    monthOrder
      .map((monthNumber) => {
        const month =
          teamScheduleMonthInformation[
            monthNumber
          ];

        const weeks =
          groupedSchedule[monthNumber] || [];

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
                <p>
                  Team schedule will be
                  added here.
                </p>
              </div>
            </section>
          `;
        }

        return `
          <section
            class="schedule-month"
            id="${month.id}"
          >
            <div class="month-heading">
              <span>${month.name}</span>
              <strong>${month.year}</strong>
            </div>

            ${weeks
              .map((week) => {
                if (
                  week.cardType === "playoff"
                ) {
                  return createTeamPlayoffPlaceholderCard(
                    week
                  );
                }

                if (
                  week.cardType === "bye"
                ) {
                  return createTeamByeCard(
                    week,
                    week.weekNumber
                  );
                }

                return createTeamScheduleCard(
                  week,
                  week.weekNumber
                );
              })
              .join("")}
          </section>
        `;
      })
      .join("");
}

applyWeeklyResultsToLeagueSchedule();
renderTeamSchedule();
