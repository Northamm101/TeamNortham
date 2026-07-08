function renderGamesPlayed() {
  const container = document.getElementById("player-games-list");

  if (!container) {
    return;
  }

  const sortedPlayers = [...teamStats.players].sort((playerA, playerB) => {
    if (playerB.gamesPlayed !== playerA.gamesPlayed) {
      return playerB.gamesPlayed - playerA.gamesPlayed;
    }

    return playerA.rosterOrder - playerB.rosterOrder;
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

renderGamesPlayed();
