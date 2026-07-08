function createEmptyRecord() {
  return {
    wins: 0,
    losses: 0,
    ties: 0
  };
}

function formatRecord(record) {
  return `${record.wins}-${record.losses}-${record.ties}`;
}

function updateTextContent(elementId, value) {
  const element = document.getElementById(elementId);

  if (element) {
    element.textContent = value;
  }
}

function addResultToRecord(record, result) {
  if (result === "W") {
    record.wins += 1;
  } else if (result === "L") {
    record.losses += 1;
  } else if (result === "T") {
    record.ties += 1;
  }
}

function calculatePoints(game) {
  if (typeof game.pointsOverride === "number") {
    return game.pointsOverride;
  }

  if (game.defaultLoss === true) {
    return teamStats.scoring.defaultLoss;
  }

  if (game.result === "W") {
    return teamStats.scoring.win;
  }

  if (game.result === "L") {
    return teamStats.scoring.loss;
  }

  if (game.result === "T") {
    return teamStats.scoring.tie;
  }

  return 0;
}

function createLineupKey(lineup) {
  if (!Array.isArray(lineup) || lineup.length === 0) {
    return "";
  }

  return lineup.join("|");
}

function formatLineupName(lineup) {
  if (!Array.isArray(lineup) || lineup.length === 0) {
    return "Lineup not entered";
  }

  return lineup.join(" – ");
}

function calculateStatistics() {
  const calculated = {
    overall: createEmptyRecord(),

    points: 0,

    drawRecords: {
      early: createEmptyRecord(),
      late: createEmptyRecord()
    },

    sheetRecords: {
      1: createEmptyRecord(),
      2: createEmptyRecord(),
      3: createEmptyRecord()
    },

    rockRecords: {
      1: {
        yellow: createEmptyRecord(),
        red: createEmptyRecord()
      },
      2: {
        yellow: createEmptyRecord(),
        red: createEmptyRecord()
      },
      3: {
        yellow: createEmptyRecord(),
        red: createEmptyRecord()
      }
    },

    playerGames: {},

    lineupRecords: {}
  };

  teamStats.roster.forEach((player) => {
    calculated.playerGames[player.name] = 0;
  });

  teamStats.games.forEach((game) => {
    addResultToRecord(calculated.overall, game.result);

    const gamePoints = calculatePoints(game);

    calculated.points += gamePoints;

    if (calculated.drawRecords[game.draw]) {
      addResultToRecord(
        calculated.drawRecords[game.draw],
        game.result
      );
    }

    if (calculated.sheetRecords[game.sheet]) {
      addResultToRecord(
        calculated.sheetRecords[game.sheet],
        game.result
      );
    }

    const normalizedRockColor =
      typeof game.rockColor === "string"
        ? game.rockColor.trim().toLowerCase()
        : "";

    if (
      calculated.rockRecords[game.sheet] &&
      calculated.rockRecords[game.sheet][normalizedRockColor]
    ) {
      addResultToRecord(
        calculated.rockRecords[game.sheet][normalizedRockColor],
        game.result
      );
    }

    const playersInGame = new Set(game.lineup || []);

    playersInGame.forEach((playerName) => {
      if (
        Object.prototype.hasOwnProperty.call(
          calculated.playerGames,
          playerName
        )
      ) {
        calculated.playerGames[playerName] += 1;
      }
    });

    const lineupKey = createLineupKey(game.lineup);

    if (lineupKey) {
      if (!calculated.lineupRecords[lineupKey]) {
        calculated.lineupRecords[lineupKey] = {
          lineup: [...game.lineup],
          record: createEmptyRecord(),
          points: 0,
          gamesPlayed: 0,
          pointsFor: 0,
          pointsAgainst: 0,
          differential: 0
        };
      }

      const lineupRecord =
        calculated.lineupRecords[lineupKey];

      addResultToRecord(
        lineupRecord.record,
        game.result
      );

      lineupRecord.points += gamePoints;
      lineupRecord.gamesPlayed += 1;

      if (
        typeof game.teamScore === "number" &&
        typeof game.opponentScore === "number"
      ) {
        lineupRecord.pointsFor += game.teamScore;
        lineupRecord.pointsAgainst += game.opponentScore;
        lineupRecord.differential +=
          game.teamScore - game.opponentScore;
      }
    }
  });

  return calculated;
}

function renderMainStatistics(calculated) {
  updateTextContent(
    "overall-record",
    formatRecord(calculated.overall)
  );

  updateTextContent(
    "overall-points",
    calculated.points
  );

  updateTextContent(
    "early-record",
    formatRecord(calculated.drawRecords.early)
  );

  updateTextContent(
    "late-record",
    formatRecord(calculated.drawRecords.late)
  );

  updateTextContent(
    "sheet-1-record",
    formatRecord(calculated.sheetRecords[1])
  );

  updateTextContent(
    "sheet-2-record",
    formatRecord(calculated.sheetRecords[2])
  );

  updateTextContent(
    "sheet-3-record",
    formatRecord(calculated.sheetRecords[3])
  );

  updateTextContent(
    "sheet-1-yellow-record",
    formatRecord(calculated.rockRecords[1].yellow)
  );

  updateTextContent(
    "sheet-1-red-record",
    formatRecord(calculated.rockRecords[1].red)
  );

  updateTextContent(
    "sheet-2-yellow-record",
    formatRecord(calculated.rockRecords[2].yellow)
  );

  updateTextContent(
    "sheet-2-red-record",
    formatRecord(calculated.rockRecords[2].red)
  );

  updateTextContent(
    "sheet-3-yellow-record",
    formatRecord(calculated.rockRecords[3].yellow)
  );

  updateTextContent(
    "sheet-3-red-record",
    formatRecord(calculated.rockRecords[3].red)
  );
}

function renderGamesPlayed(calculated) {
  const container =
    document.getElementById("player-games-list");

  if (!container) {
    return;
  }

  const sortedPlayers = teamStats.roster
    .map((player) => ({
      ...player,
      gamesPlayed:
        calculated.playerGames[player.name] || 0
    }))
    .sort((playerA, playerB) => {
      if (
        playerB.gamesPlayed !==
        playerA.gamesPlayed
      ) {
        return (
          playerB.gamesPlayed -
          playerA.gamesPlayed
        );
      }

      return (
        playerA.rosterOrder -
        playerB.rosterOrder
      );
    });

  container.innerHTML = sortedPlayers
    .map(
      (player) => `
        <div class="player-games-row">
          <span>${player.name}</span>
          <strong>${player.gamesPlayed}</strong>
        </div>
      `
    )
    .join("");
}

function calculateWinPercentage(lineupRecord) {
  if (lineupRecord.gamesPlayed === 0) {
    return 0;
  }

  return (
    lineupRecord.record.wins +
    lineupRecord.record.ties * 0.5
  ) / lineupRecord.gamesPlayed;
}

function renderLineupPerformance(calculated) {
  const container =
    document.getElementById(
      "lineup-performance-list"
    );

  if (!container) {
    return;
  }

  const lineups = Object.values(
    calculated.lineupRecords
  );

  if (lineups.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No lineups have been recorded yet.</p>
      </div>
    `;

    return;
  }

  const sortedLineups = lineups.sort(
    (lineupA, lineupB) => {
      if (lineupB.points !== lineupA.points) {
        return lineupB.points - lineupA.points;
      }

      const winPercentageDifference =
        calculateWinPercentage(lineupB) -
        calculateWinPercentage(lineupA);

      if (winPercentageDifference !== 0) {
        return winPercentageDifference;
      }

      if (
        lineupB.differential !==
        lineupA.differential
      ) {
        return (
          lineupB.differential -
          lineupA.differential
        );
      }

      if (
        lineupB.gamesPlayed !==
        lineupA.gamesPlayed
      ) {
        return (
          lineupB.gamesPlayed -
          lineupA.gamesPlayed
        );
      }

      return formatLineupName(
        lineupA.lineup
      ).localeCompare(
        formatLineupName(lineupB.lineup)
      );
    }
  );

  container.innerHTML = sortedLineups
    .map(
      (lineupRecord) => `
        <div class="lineup-performance-row">
          <div>
            <span class="lineup-performance-name">
              ${formatLineupName(lineupRecord.lineup)}
            </span>

            <small>
              ${lineupRecord.points} points ·
              ${lineupRecord.gamesPlayed} ${
                lineupRecord.gamesPlayed === 1
                  ? "game"
                  : "games"
              }
            </small>
          </div>

          <strong>
            ${formatRecord(lineupRecord.record)}
          </strong>
        </div>
      `
    )
    .join("");
}

function getResultLabel(result) {
  if (result === "W") {
    return "Win";
  }

  if (result === "L") {
    return "Loss";
  }

  if (result === "T") {
    return "Tie";
  }

  return "Result";
}

function getResultClass(result) {
  if (result === "W") {
    return "weekly-result-win";
  }

  if (result === "L") {
    return "weekly-result-loss";
  }

  if (result === "T") {
    return "weekly-result-tie";
  }

  return "";
}

function formatLineup(lineup) {
  if (
    !Array.isArray(lineup) ||
    lineup.length === 0
  ) {
    return "Not entered";
  }

  return lineup.join(", ");
}

function renderWeeklyResults() {
  const container =
    document.getElementById(
      "weekly-results-list"
    );

  if (!container) {
    return;
  }

  if (teamStats.games.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No games have been played yet.</p>
      </div>
    `;

    return;
  }

  const gamesNewestFirst = [
    ...teamStats.games
  ].sort(
    (gameA, gameB) =>
      new Date(`${gameB.date}T12:00:00`) -
      new Date(`${gameA.date}T12:00:00`)
  );

  container.innerHTML = gamesNewestFirst
    .map((game) => {
      const resultClass =
        getResultClass(game.result);

      const resultLabel =
        getResultLabel(game.result);

      const score =
        typeof game.teamScore === "number" &&
        typeof game.opponentScore === "number"
          ? `${game.teamScore}-${game.opponentScore}`
          : "—";

      return `
        <article class="weekly-result-card ${resultClass}">
          <div class="weekly-result-header">
            <div>
              <span class="weekly-result-date">
                ${game.displayDate}
              </span>

              <h3>
                Team 7 vs Team ${game.opponent}
              </h3>
            </div>

            <span class="weekly-result-badge">
              ${resultLabel}
            </span>
          </div>

          <div class="weekly-result-summary">
            <div>
              <span>Score</span>
              <strong>${score}</strong>
            </div>

            <div>
              <span>Draw</span>
              <strong>
                ${
                  game.draw === "early"
                    ? "Early"
                    : "Late"
                }
              </strong>
            </div>

            <div>
              <span>Sheet</span>
              <strong>${game.sheet}</strong>
            </div>
          </div>

          <dl class="weekly-result-details">
            <div>
              <dt>Time</dt>
              <dd>${game.time || "—"}</dd>
            </div>

            <div>
              <dt>Rock Colour</dt>
              <dd>
                ${game.rockColor || "Not entered"}
              </dd>
            </div>

            <div>
              <dt>Lineup</dt>
              <dd>
                ${formatLineup(game.lineup)}
              </dd>
            </div>

            ${
              game.notes
                ? `
                  <div>
                    <dt>Notes</dt>
                    <dd>${game.notes}</dd>
                  </div>
                `
                : ""
            }
          </dl>
        </article>
      `;
    })
    .join("");
}

const calculatedStatistics =
  calculateStatistics();

renderMainStatistics(calculatedStatistics);
renderGamesPlayed(calculatedStatistics);
renderLineupPerformance(
  calculatedStatistics
);
renderWeeklyResults();
