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

function renderHistoricalOpponentCard(opponent) {
  return `
    <article class="dashboard-card head-to-head-card">
      <div class="card-heading">
        <div>
          <p class="card-label">Opponent</p>
          <h2>${opponent.name}</h2>
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

  const currentOpponents =
    headToHeadOpponentData.opponents.filter(
      isCurrentHistoricalOpponent
    );

  const formerOpponents =
    headToHeadOpponentData.opponents.filter(
      (opponent) =>
        !isCurrentHistoricalOpponent(opponent)
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
