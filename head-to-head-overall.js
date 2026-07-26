const historicalSeasonData = [
  {
    key: "2022",
    label: "2022–23",
    data: teamStats2022
  },
  {
    key: "2023",
    label: "2023–24",
    data: teamStats2023
  },
  {
    key: "2024",
    label: "2024–25",
    data: teamStats2024
  },
  {
    key: "2025",
    label: "2025–26",
    data: teamStats2025
  },
  {
    key: "2026",
    label: "2026–27",
    data: teamStats
  }
];

function createHistoricalEmptyRecord() {
  return {
    wins: 0,
    losses: 0,
    ties: 0
  };
}

function addHistoricalResult(record, result) {
  if (result === "W") {
    record.wins += 1;
  } else if (result === "L") {
    record.losses += 1;
  } else if (result === "T") {
    record.ties += 1;
  }
}

function formatHistoricalRecord(record) {
  return `${record.wins}-${record.losses}-${record.ties}`;
}

function getHistoricalGamesPlayed(record) {
  return (
    record.wins +
    record.losses +
    record.ties
  );
}

function calculateHistoricalWinPercentage(record) {
  const gamesPlayed =
    getHistoricalGamesPlayed(record);

  if (gamesPlayed === 0) {
    return 0;
  }

  return (
    record.wins +
    record.ties * 0.5
  ) / gamesPlayed;
}

function formatHistoricalWinPercentage(record) {
  const percentage =
    calculateHistoricalWinPercentage(record) * 100;

  return `${percentage.toFixed(1)}%`;
}

function formatHistoricalSignedNumber(number) {
  if (number > 0) {
    return `+${number}`;
  }

  return `${number}`;
}

function calculateHistoricalAverageDifferential(
  opponentRecord
) {
  if (opponentRecord.scoredGames === 0) {
    return "—";
  }

  const average =
    opponentRecord.differential /
    opponentRecord.scoredGames;

  return average > 0
    ? `+${average.toFixed(2)}`
    : average.toFixed(2);
}

const historicalRegularPlayerNames =
  new Set(
    Array.isArray(teamStats.roster)
      ? teamStats.roster.map(
          (player) => player.name
        )
      : []
  );

function formatHistoricalLineupName(lineup) {
  return lineup
    .map((playerName) =>
      historicalRegularPlayerNames.has(
        playerName
      )
        ? playerName
        : `${playerName} (Spare)`
    )
    .join(" – ");
}

function calculateHistoricalLineupWinPercentage(
  lineupRecord
) {
  if (lineupRecord.gamesPlayed === 0) {
    return 0;
  }

  return (
    lineupRecord.record.wins +
    lineupRecord.record.ties * 0.5
  ) / lineupRecord.gamesPlayed;
}

function sortHistoricalLineupRecords(
  lineupRecords
) {
  return [...lineupRecords].sort(
    (lineupA, lineupB) => {
      if (
        lineupB.gamesPlayed !==
        lineupA.gamesPlayed
      ) {
        return (
          lineupB.gamesPlayed -
          lineupA.gamesPlayed
        );
      }

      const percentageDifference =
        calculateHistoricalLineupWinPercentage(
          lineupB
        ) -
        calculateHistoricalLineupWinPercentage(
          lineupA
        );

      if (percentageDifference !== 0) {
        return percentageDifference;
      }

      return formatHistoricalLineupName(
        lineupA.lineup
      ).localeCompare(
        formatHistoricalLineupName(
          lineupB.lineup
        )
      );
    }
  );
}

function isCurrentHistoricalOpponent(opponent) {
  const currentSeason =
    opponent.seasons[
      headToHeadOpponentData.currentSeasonKey
    ];

  return Boolean(
    currentSeason &&
    Number.isInteger(currentSeason.regularSeason)
  );
}

function findHistoricalOpponent(
  seasonKey,
  game
) {
  const opponentReference =
    game.headToHeadOpponent ?? game.opponent;

  const opponentNumber =
    Number(opponentReference);

  if (Number.isInteger(opponentNumber)) {
    return headToHeadOpponentData.opponents.find(
      (opponent) =>
        Number(
          opponent.seasons[seasonKey]
            ?.regularSeason
        ) === opponentNumber
    );
  }

  const playoffSeed =
    typeof opponentReference === "string"
      ? opponentReference.trim()
      : "";

  if (!playoffSeed) {
    return null;
  }

  return headToHeadOpponentData.opponents.find(
    (opponent) =>
      opponent.seasons[seasonKey]
        ?.playoffs === playoffSeed
  );
}

function createHistoricalOpponentRecords() {
  const records = {};

  headToHeadOpponentData.opponents.forEach(
    (opponent) => {
      records[opponent.name] = {
        opponent,
        overall: createHistoricalEmptyRecord(),

regularSeason:
  createHistoricalEmptyRecord(),

playoffs:
  createHistoricalEmptyRecord(),

drawRecords: {
  early: createHistoricalEmptyRecord(),
  late: createHistoricalEmptyRecord()
},

sheetRecords: {
  1: createHistoricalEmptyRecord(),
  2: createHistoricalEmptyRecord(),
  3: createHistoricalEmptyRecord()
},

rockRecords: {
  yellow: createHistoricalEmptyRecord(),
  red: createHistoricalEmptyRecord()
},

lineupRecords: {},

scoredGames: 0,
pointsFor: 0,
pointsAgainst: 0,
differential: 0,

games: []
      };
    }
  );

  return records;
}

function calculateHistoricalOpponentRecords() {
  const records =
    createHistoricalOpponentRecords();

  historicalSeasonData.forEach(
    (seasonEntry) => {
      const seasonGames =
        Array.isArray(seasonEntry.data.games)
          ? seasonEntry.data.games
          : [];

      seasonGames.forEach((game) => {
        const opponent =
          findHistoricalOpponent(
            seasonEntry.key,
            game
          );

        if (!opponent) {
          return;
        }

        const opponentRecord =
          records[opponent.name];

        const normalizedPhase =
          typeof game.phase === "string"
            ? game.phase.trim().toLowerCase()
            : "regular season";

        const isPlayoff =
          normalizedPhase === "playoff" ||
          normalizedPhase === "playoffs";

        addHistoricalResult(
          opponentRecord.overall,
          game.result
        );

        if (isPlayoff) {
  addHistoricalResult(
    opponentRecord.playoffs,
    game.result
  );
} else {
  addHistoricalResult(
    opponentRecord.regularSeason,
    game.result
  );
}

if (opponentRecord.drawRecords[game.draw]) {
  addHistoricalResult(
    opponentRecord.drawRecords[game.draw],
    game.result
  );
}

if (opponentRecord.sheetRecords[game.sheet]) {
  addHistoricalResult(
    opponentRecord.sheetRecords[game.sheet],
    game.result
  );
}

const normalizedRockColor =
  typeof game.rockColor === "string"
    ? game.rockColor.trim().toLowerCase()
    : "";

if (
  opponentRecord.rockRecords[
    normalizedRockColor
  ]
) {
  addHistoricalResult(
    opponentRecord.rockRecords[
      normalizedRockColor
    ],
    game.result
  );
}

if (
  Array.isArray(game.lineup) &&
  game.lineup.length > 0
) {
  const lineupKey =
    game.lineup.join("|");

  if (
    !opponentRecord.lineupRecords[
      lineupKey
    ]
  ) {
    opponentRecord.lineupRecords[
      lineupKey
    ] = {
      lineup: [...game.lineup],
      record:
        createHistoricalEmptyRecord(),
      gamesPlayed: 0
    };
  }

  const lineupRecord =
    opponentRecord.lineupRecords[
      lineupKey
    ];

  addHistoricalResult(
    lineupRecord.record,
    game.result
  );

  lineupRecord.gamesPlayed += 1;
}
        
if (
  typeof game.teamScore === "number" &&
  typeof game.opponentScore === "number"
) {
  opponentRecord.scoredGames += 1;

  opponentRecord.pointsFor +=
    game.teamScore;

  opponentRecord.pointsAgainst +=
    game.opponentScore;

  opponentRecord.differential +=
    game.teamScore -
    game.opponentScore;
}

opponentRecord.games.push({
          ...game,
          seasonKey: seasonEntry.key,
          seasonLabel: seasonEntry.label,
          phase: isPlayoff
            ? "Playoffs"
            : "Regular Season"
        });
      });
    }
  );

  return Object.values(records);
}

function sortHistoricalOpponents(opponents) {
  return [...opponents].sort(
    (opponentA, opponentB) => {
      const percentageDifference =
        calculateHistoricalWinPercentage(
          opponentB.overall
        ) -
        calculateHistoricalWinPercentage(
          opponentA.overall
        );

      if (percentageDifference !== 0) {
        return percentageDifference;
      }

      const gamesDifference =
        getHistoricalGamesPlayed(
          opponentB.overall
        ) -
        getHistoricalGamesPlayed(
          opponentA.overall
        );

      if (gamesDifference !== 0) {
        return gamesDifference;
      }

      return opponentA.opponent.name.localeCompare(
        opponentB.opponent.name
      );
    }
  );
}

function renderHistoricalOpponentCard(
  opponentRecord
) {
  const gamesPlayed =
    getHistoricalGamesPlayed(
      opponentRecord.overall
    );

  return `
    <article class="dashboard-card head-to-head-card">
      <div class="card-heading">
        <div>
          <p class="card-label">Opponent</p>

          <h2>
            ${opponentRecord.opponent.name}
          </h2>
        </div>

        <span class="lineup-record-bubble">
          ${formatHistoricalRecord(
            opponentRecord.overall
          )}
        </span>
      </div>

      <div class="head-to-head-summary-grid">
        <div>
          <span>Games</span>
          <strong>${gamesPlayed}</strong>
        </div>

        <div>
          <span>Winning %</span>
          <strong>
            ${formatHistoricalWinPercentage(
              opponentRecord.overall
            )}
          </strong>
        </div>

        <div>
          <span>Overall</span>
          <strong>
            ${formatHistoricalRecord(
              opponentRecord.overall
            )}
          </strong>
        </div>

        <div>
          <span>Regular Season</span>
          <strong>
            ${formatHistoricalRecord(
              opponentRecord.regularSeason
            )}
          </strong>
        </div>

        <div>
          <span>Playoffs</span>
          <strong>
            ${formatHistoricalRecord(
              opponentRecord.playoffs
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
              ${formatHistoricalRecord(
                opponentRecord.drawRecords.early
              )}
            </strong>
          </div>

          <div>
            <span>Late Draw</span>
            <strong>
              ${formatHistoricalRecord(
                opponentRecord.drawRecords.late
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
              ${formatHistoricalRecord(
                opponentRecord.sheetRecords[1]
              )}
            </strong>
          </div>

          <div>
            <span>Sheet 2</span>
            <strong>
              ${formatHistoricalRecord(
                opponentRecord.sheetRecords[2]
              )}
            </strong>
          </div>

          <div>
            <span>Sheet 3</span>
            <strong>
              ${formatHistoricalRecord(
                opponentRecord.sheetRecords[3]
              )}
            </strong>
          </div>
        </div>
            </section>

      ${
        getHistoricalGamesPlayed(
          opponentRecord.rockRecords.yellow
        ) +
          getHistoricalGamesPlayed(
            opponentRecord.rockRecords.red
          ) >
        0
          ? `
            <section class="lineup-breakdown-section">
              <h3>Rock Performance</h3>

              <div class="lineup-two-column-grid">
                <div>
                  <span>Yellow Rocks</span>
                  <strong>
                    ${formatHistoricalRecord(
                      opponentRecord.rockRecords.yellow
                    )}
                  </strong>
                </div>

                <div>
                  <span>Red Rocks</span>
                  <strong>
                    ${formatHistoricalRecord(
                      opponentRecord.rockRecords.red
                    )}
                  </strong>
                </div>
              </div>
            </section>
          `
          : ""
      }

            ${
        Object.keys(
          opponentRecord.lineupRecords
        ).length > 0
          ? `
            <section class="lineup-breakdown-section">
              <h3>Lineup Performance</h3>

              <div class="lineup-performance-list">
                ${sortHistoricalLineupRecords(
                  Object.values(
                    opponentRecord.lineupRecords
                  )
                )
                  .map(
                    (lineupRecord) => `
                      <div class="lineup-performance-row">
                        <div>
                          <span class="lineup-performance-name">
                            ${formatHistoricalLineupName(
                              lineupRecord.lineup
                            )}
                          </span>

                          <small>
                            ${lineupRecord.gamesPlayed}
                            ${
                              lineupRecord.gamesPlayed === 1
                                ? "game"
                                : "games"
                            }
                            ·
                            ${formatHistoricalWinPercentage(
                              lineupRecord.record
                            )}
                          </small>
                        </div>

                        <strong>
                          ${formatHistoricalRecord(
                            lineupRecord.record
                          )}
                        </strong>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            </section>
          `
          : ""
      }

      ${
        opponentRecord.scoredGames > 0
          ? `
            <section class="lineup-breakdown-section">
              <h3>Score Performance</h3>

              <div class="head-to-head-summary-grid">
                <div>
                  <span>Scored Games</span>
                  <strong>
                    ${opponentRecord.scoredGames}
                  </strong>
                </div>

                <div>
                  <span>For / Against</span>
                  <strong>
                    ${opponentRecord.pointsFor} /
                    ${opponentRecord.pointsAgainst}
                  </strong>
                </div>

                <div>
                  <span>Differential</span>
                  <strong>
                    ${formatHistoricalSignedNumber(
                      opponentRecord.differential
                    )}
                  </strong>
                </div>

                <div>
                  <span>Average Differential</span>
                  <strong>
                    ${calculateHistoricalAverageDifferential(
                      opponentRecord
                    )}
                  </strong>
                </div>
              </div>
            </section>
          `
          : ""
      }
    </article>
  `;
}

function renderHistoricalOpponentGroup(
  title,
  opponents
) {
  return `
    <section class="historical-opponent-group">
      <div class="card-heading">
        <div>
          <p class="card-label">
            Historical Opponents
          </p>

          <h2>${title}</h2>
        </div>
      </div>

      ${opponents
        .map(renderHistoricalOpponentCard)
        .join("")}
    </section>
  `;
}

function renderOverallHeadToHeadPage() {
  const container =
    document.getElementById(
      "head-to-head-list"
    );

  if (!container) {
    return;
  }

  const historicalRecords =
    calculateHistoricalOpponentRecords();

  const currentOpponents =
    sortHistoricalOpponents(
      historicalRecords.filter(
        (opponentRecord) =>
          isCurrentHistoricalOpponent(
            opponentRecord.opponent
          )
      )
    );

  const formerOpponents =
    sortHistoricalOpponents(
      historicalRecords.filter(
        (opponentRecord) =>
          !isCurrentHistoricalOpponent(
            opponentRecord.opponent
          )
      )
    );

  container.innerHTML = `
    ${renderHistoricalOpponentGroup(
      "Current Opponents",
      currentOpponents
    )}

    ${renderHistoricalOpponentGroup(
      "Former Opponents",
      formerOpponents
    )}
  `;
}

renderOverallHeadToHeadPage();
