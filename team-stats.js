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

function isRegularPlayer(playerName) {
  return teamStats.roster.some(
    (player) => player.name === playerName
  );
}

function formatPlayerName(playerName) {
  return isRegularPlayer(playerName)
    ? playerName
    : `${playerName} (Spare)`;
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

  return lineup
    .map((playerName) =>
      formatPlayerName(playerName)
    )
    .join(" – ");
}

const teamNames = {
  1: "Team 1",
  2: "Team 2",
  3: "Team 3",
  4: "Team 4",
  5: "Team 5",
  6: "Team 6",
  7: "Team 7",
  8: "Team 8",
  9: "Team 9",
  10: "Team 10",
  11: "Team 11",
  12: "Team 12"
};

function getOpponentName(opponentNumber) {
  return (
    teamNames[opponentNumber] ||
    `Team ${opponentNumber}`
  );
}

function shouldTrackRockColors() {
  return teamStats.trackRockColors !== false;
}

function shouldTrackScores() {
  return teamStats.trackScores !== false;
}

function shouldTrackLineups() {
  return teamStats.trackLineups !== false;
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

lineupRecords: {},

headToHeadRecords: {}
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
    !Object.prototype.hasOwnProperty.call(
      calculated.playerGames,
      playerName
    )
  ) {
    calculated.playerGames[playerName] = 0;
  }

  calculated.playerGames[playerName] += 1;
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
  differential: 0,

  drawRecords: {
    early: createEmptyRecord(),
    late: createEmptyRecord()
  },

  sheetRecords: {
    1: createEmptyRecord(),
    2: createEmptyRecord(),
    3: createEmptyRecord()
  },

  games: []
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

if (lineupRecord.drawRecords[game.draw]) {
  addResultToRecord(
    lineupRecord.drawRecords[game.draw],
    game.result
  );
}

if (lineupRecord.sheetRecords[game.sheet]) {
  addResultToRecord(
    lineupRecord.sheetRecords[game.sheet],
    game.result
  );
}

if (
  typeof game.teamScore === "number" &&
  typeof game.opponentScore === "number"
) {
  lineupRecord.pointsFor += game.teamScore;
  lineupRecord.pointsAgainst += game.opponentScore;
  lineupRecord.differential +=
    game.teamScore - game.opponentScore;
}

lineupRecord.games.push({
  ...game,
  pointsEarned: gamePoints
});
    }

    const opponentNumber = Number(game.opponent);

    const currentTeamNumber =
  Number(teamStats.teamNumber);

if (
  Number.isInteger(opponentNumber) &&
  opponentNumber !== currentTeamNumber
) {
      if (!calculated.headToHeadRecords[opponentNumber]) {
        calculated.headToHeadRecords[opponentNumber] = {
          opponent: opponentNumber,
          opponentName: getOpponentName(opponentNumber),

          overall: createEmptyRecord(),
          regularSeason: createEmptyRecord(),
          playoffs: createEmptyRecord(),

          gamesPlayed: 0,
          pointsFor: 0,
          pointsAgainst: 0,
          differential: 0,

          games: []
        };
      }

      const headToHead =
        calculated.headToHeadRecords[opponentNumber];

      const normalizedPhase =
        typeof game.phase === "string"
          ? game.phase.trim().toLowerCase()
          : "regular";

      addResultToRecord(
        headToHead.overall,
        game.result
      );

      if (
        normalizedPhase === "playoff" ||
        normalizedPhase === "playoffs"
      ) {
        addResultToRecord(
          headToHead.playoffs,
          game.result
        );
      } else {
        addResultToRecord(
          headToHead.regularSeason,
          game.result
        );
      }

      headToHead.gamesPlayed += 1;

      if (
        typeof game.teamScore === "number" &&
        typeof game.opponentScore === "number"
      ) {
        headToHead.pointsFor += game.teamScore;
        headToHead.pointsAgainst +=
          game.opponentScore;

        headToHead.differential +=
          game.teamScore -
          game.opponentScore;
      }

      headToHead.games.push({
        ...game,
        phase:
          normalizedPhase === "playoff" ||
          normalizedPhase === "playoffs"
            ? "Playoffs"
            : "Regular Season"
      });
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

  const regularPlayerNames = new Set(
  teamStats.roster.map((player) => player.name)
);

const regularPlayers = teamStats.roster.map((player) => ({
  ...player,
  playerType: "Regular",
  gamesPlayed:
    calculated.playerGames[player.name] || 0
}));

const sparePlayers = Object.keys(
  calculated.playerGames
)
  .filter(
    (playerName) =>
      !regularPlayerNames.has(playerName)
  )
  .map((playerName) => ({
    name: playerName,
    playerType: "Spare",
    rosterOrder: 999,
    gamesPlayed:
      calculated.playerGames[playerName] || 0
  }));

const sortedPlayers = [
  ...regularPlayers,
  ...sparePlayers
].sort((playerA, playerB) => {
  if (
    playerB.gamesPlayed !==
    playerA.gamesPlayed
  ) {
    return (
      playerB.gamesPlayed -
      playerA.gamesPlayed
    );
  }

  if (
    playerA.playerType !==
    playerB.playerType
  ) {
    return playerA.playerType === "Regular"
      ? -1
      : 1;
  }

  if (
    playerA.playerType === "Regular"
  ) {
    return (
      playerA.rosterOrder -
      playerB.rosterOrder
    );
  }

  return playerA.name.localeCompare(
    playerB.name
  );
});

  container.innerHTML = sortedPlayers
  .map((player) => {
    const playerLabel =
      player.playerType === "Spare"
        ? `${player.name} (Spare)`
        : player.name;

    return `
      <div class="player-games-row">
        <span>${playerLabel}</span>
        <strong>${player.gamesPlayed}</strong>
      </div>
    `;
  })
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
        <p>Lineup statistics will appear here after the first game of the 2026–27 season.</p>
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

function formatSignedNumber(number) {
  if (number > 0) {
    return `+${number}`;
  }

  return `${number}`;
}

function calculateAverageDifferential(lineupRecord) {
  if (lineupRecord.gamesPlayed === 0) {
    return "0.00";
  }

  const average =
    lineupRecord.differential /
    lineupRecord.gamesPlayed;

  return average > 0
    ? `+${average.toFixed(2)}`
    : average.toFixed(2);
}

function sortLineupRecords(lineups) {
  return lineups.sort((lineupA, lineupB) => {
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
  });
}

function renderLineupGameRows(games) {
  const gamesNewestFirst = [...games].sort(
    (gameA, gameB) =>
      new Date(`${gameB.date}T12:00:00`) -
      new Date(`${gameA.date}T12:00:00`)
  );

  return gamesNewestFirst
    .map((game) => {
      const score =
        typeof game.teamScore === "number" &&
        typeof game.opponentScore === "number"
          ? `${game.teamScore}-${game.opponentScore}`
          : "—";

      const endsText =
  Number.isInteger(game.ends)
    ? ` (${game.ends}e)`
    : "";
      
      return `
        <div class="lineup-game-row">
          <div class="lineup-game-heading">
            <div>
              <span>${game.displayDate}</span>
              <strong>
                vs Team ${game.opponent}
              </strong>
            </div>

            <span class="lineup-game-result ${getResultClass(game.result)}">
              ${getResultLabel(game.result)}
            </span>
          </div>

          <div class="lineup-game-details">
            <div>
              <span>Score</span>
              <strong>${score}${endsText}</strong>
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

            ${
  shouldTrackRockColors()
    ? `
      <div>
        <span>Rocks</span>
        <strong>
          ${game.rockColor || "—"}
        </strong>
      </div>
    `
    : ""
}
          </div>
        </div>
      `;
    })
    .join("");
}

function renderLineupStatistics(calculated) {
  const container =
    document.getElementById(
      "lineup-statistics-list"
    );

  if (!container) {
    return;
  }

  const lineups = sortLineupRecords(
    Object.values(calculated.lineupRecords)
  );

  if (lineups.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No lineups have been recorded yet.</p>
      </div>
    `;

    return;
  }

  container.innerHTML = lineups
    .map(
      (lineupRecord, index) => `
        <article class="dashboard-card lineup-statistics-card">
          <div class="card-heading">
            <div>
              <p class="card-label">
                Lineup ${index + 1}
              </p>

              <h2>
                ${formatLineupName(lineupRecord.lineup)}
              </h2>
            </div>

            <span class="lineup-record-bubble">
              ${formatRecord(lineupRecord.record)}
            </span>
          </div>

          <div class="lineup-summary-grid">
            <div>
              <span>Games</span>
              <strong>${lineupRecord.gamesPlayed}</strong>
            </div>

            <div>
              <span>Points</span>
              <strong>${lineupRecord.points}</strong>
            </div>

            <div>
              <span>For / Against</span>
              <strong>
                ${lineupRecord.pointsFor} /
                ${lineupRecord.pointsAgainst}
              </strong>
            </div>

            <div>
            <span>Average Diff.</span>
            <strong>
              ${calculateAverageDifferential(
              lineupRecord
            )}
  </strong>
  </div>
</div>

          <section class="lineup-breakdown-section">
            <h3>Draw Performance</h3>

            <div class="lineup-two-column-grid">
              <div>
                <span>Early Draw</span>
                <strong>
                  ${formatRecord(
                    lineupRecord.drawRecords.early
                  )}
                </strong>
              </div>

              <div>
                <span>Late Draw</span>
                <strong>
                  ${formatRecord(
                    lineupRecord.drawRecords.late
                  )}
                </strong>
              </div>
            </div>
          </section>

          <section class="lineup-breakdown-section">
            <h3>Sheet Performance</h3>

            <div class="lineup-sheet-grid">
              <div>
                <span>Sheet 1</span>
                <strong>
                  ${formatRecord(
                    lineupRecord.sheetRecords[1]
                  )}
                </strong>
              </div>

              <div>
                <span>Sheet 2</span>
                <strong>
                  ${formatRecord(
                    lineupRecord.sheetRecords[2]
                  )}
                </strong>
              </div>

              <div>
                <span>Sheet 3</span>
                <strong>
                  ${formatRecord(
                    lineupRecord.sheetRecords[3]
                  )}
                </strong>
              </div>
            </div>
          </section>

          <section class="lineup-breakdown-section">
            <h3>Games Played</h3>

            <div class="lineup-games-list">
              ${renderLineupGameRows(
                lineupRecord.games
              )}
            </div>
          </section>
        </article>
      `
    )
    .join("");
}

function renderHeadToHeadGameRows(games) {
  const gamesNewestFirst = [...games].sort(
    (gameA, gameB) =>
      new Date(`${gameB.date}T12:00:00`) -
      new Date(`${gameA.date}T12:00:00`)
  );

  return gamesNewestFirst
    .map((game) => {
      const score =
        typeof game.teamScore === "number" &&
        typeof game.opponentScore === "number"
          ? `${game.teamScore}-${game.opponentScore}`
          : "—";

      const endsText =
  Number.isInteger(game.ends)
    ? ` (${game.ends}e)`
    : "";

      return `
        <div class="head-to-head-game-row">
          <div class="head-to-head-game-heading">
            <div>
              <span>${game.displayDate}</span>

              <strong>${game.phase}</strong>
            </div>

            <span class="lineup-game-result ${getResultClass(
              game.result
            )}">
              ${getResultLabel(game.result)}
            </span>
          </div>

          <div class="head-to-head-game-details">
            <div>
              <span>Score</span>
              <strong>
                ${score}${endsText}
              </strong>
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

            ${
  shouldTrackRockColors()
    ? `
      <div>
        <span>Rocks</span>
        <strong>
          ${game.rockColor || "—"}
        </strong>
      </div>
    `
    : ""
}
          </div>
        </div>
      `;
    })
    .join("");
}

function renderHeadToHeadStatistics(calculated) {
  const container =
    document.getElementById(
      "head-to-head-list"
    );

  if (!container) {
    return;
  }

  const opponents = Object.values(
    calculated.headToHeadRecords
  ).sort(
    (opponentA, opponentB) =>
      opponentA.opponent -
      opponentB.opponent
  );

  if (opponents.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>
          Head-to-head records will appear here after the first game of the 2026–27 season.
        </p>
      </div>
    `;

    return;
  }

  container.innerHTML = opponents
    .map(
      (headToHead) => `
        <article class="dashboard-card head-to-head-card">
          <div class="card-heading">
            <div>
              <p class="card-label">
                Opponent
              </p>

              <h2>
               Team ${headToHead.opponent}
              </h2>
            </div>

            <span class="lineup-record-bubble">
              ${formatRecord(
                headToHead.overall
              )}
            </span>
          </div>

          <div class="head-to-head-summary-grid">
            <div>
              <span>Games</span>
              <strong>
                ${headToHead.gamesPlayed}
              </strong>
            </div>

            <div>
              <span>Overall</span>
              <strong>
                ${formatRecord(
                  headToHead.overall
                )}
              </strong>
            </div>

            <div>
              <span>Regular Season</span>
              <strong>
                ${formatRecord(
                  headToHead.regularSeason
                )}
              </strong>
            </div>

            <div>
              <span>Playoffs</span>
              <strong>
                ${formatRecord(
                  headToHead.playoffs
                )}
              </strong>
            </div>

            <div>
              <span>For / Against</span>
              <strong>
                ${headToHead.pointsFor} /
                ${headToHead.pointsAgainst}
              </strong>
            </div>

            <div>
              <span>Differential</span>
              <strong>
                ${formatSignedNumber(
                  headToHead.differential
                )}
              </strong>
            </div>
          </div>

          <section class="head-to-head-games-section">
            <h3>Games Played</h3>

            <div class="head-to-head-games-list">
              ${renderHeadToHeadGameRows(
                headToHead.games
              )}
            </div>
          </section>
        </article>
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

  return lineup
    .map((playerName) =>
      formatPlayerName(playerName)
    )
    .join(", ");
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
      <p>Weekly game results will appear here after the first game of the 2026–27 season.</p>
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

      const endsText =
      Number.isInteger(game.ends)
      ? ` (${game.ends}e)`
      : "";
      
      return `
        <article class="weekly-result-card ${resultClass}">
          <div class="weekly-result-header">
            <div>
              <span class="weekly-result-date">
                ${game.displayDate}
              </span>

              <h3>
              Team ${teamStats.teamNumber} vs Team ${game.opponent}
              </h3>
            </div>

            <span class="weekly-result-badge">
              ${resultLabel}
            </span>
          </div>

          <div class="weekly-result-summary">
  ${
    shouldTrackScores()
      ? `
        <div>
          <span>Score</span>
          <strong>${score}${endsText}</strong>
        </div>
      `
      : ""
  }

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

            ${
  shouldTrackRockColors()
    ? `
      <div>
        <dt>Rock Colour</dt>
        <dd>
          ${game.rockColor || "Not entered"}
        </dd>
      </div>
    `
    : ""
}

${
  shouldTrackLineups()
    ? `
      <div>
        <dt>Lineup</dt>
        <dd>
          ${formatLineup(game.lineup)}
        </dd>
      </div>
    `
    : ""
}

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

renderLineupStatistics(
  calculatedStatistics
);

renderHeadToHeadStatistics(
  calculatedStatistics
);

renderWeeklyResults();

