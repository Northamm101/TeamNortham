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
