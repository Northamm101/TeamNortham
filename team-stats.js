function formatRecord(record) {
  return `${record.wins}-${record.losses}-${record.ties}`;
}

function updateTextContent(elementId, value) {
  const element = document.getElementById(elementId);

  if (element) {
    element.textContent = value;
  }
}

function renderMainStatistics() {
  updateTextContent(
    "overall-record",
    formatRecord(teamStats.overall)
  );

  updateTextContent(
    "overall-points",
    teamStats.overall.points
  );

  updateTextContent(
    "early-record",
    formatRecord(teamStats.drawRecords.early)
  );

  updateTextContent(
    "late-record",
    formatRecord(teamStats.drawRecords.late)
  );

  updateTextContent(
    "sheet-1-record",
    formatRecord(teamStats.sheetRecords[1])
  );

  updateTextContent(
    "sheet-2-record",
    formatRecord(teamStats.sheetRecords[2])
  );

  updateTextContent(
    "sheet-3-record",
    formatRecord(teamStats.sheetRecords[3])
  );
}

function renderGamesPlayed() {
  const container = document.getElementById("player-games-list");

  if (!container) {
    return;
  }

  const sortedPlayers = [...teamStats.players].sort(
    (playerA, playerB) => {
      if (playerB.gamesPlayed !== playerA.gamesPlayed) {
        return playerB.gamesPlayed - playerA.gamesPlayed;
      }

      return playerA.rosterOrder - playerB.rosterOrder;
    }
  );

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

renderMainStatistics();
renderGamesPlayed();
