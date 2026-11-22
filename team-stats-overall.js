
/* =========================================================
   TEAM NORTHAM — OVERALL STATISTICS
   Seasons: 2022–23 onward
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Season Sources ---------- */

  const seasons = [
    typeof teamStats2022 !== "undefined" ? teamStats2022 : null,
    typeof teamStats2023 !== "undefined" ? teamStats2023 : null,
    typeof teamStats2024 !== "undefined" ? teamStats2024 : null,
    typeof teamStats2025 !== "undefined" ? teamStats2025 : null,
    typeof teamStats !== "undefined" ? teamStats : null
  ].filter(Boolean);

  const phaseNames = ["overall", "regular", "playoffs"];

  const phaseLabels = {
    overall: "Overall",
    regular: "Regular Season",
    playoffs: "Playoffs"
  };

  const regularPlayers = ["Jason", "Jeff", "Tom", "Mike", "Dallas"];

  /* ---------- Utility Functions ---------- */

  function emptyRecord() {
    return {
      wins: 0,
      losses: 0,
      ties: 0,
      points: 0,
      gamesPlayed: 0
    };
  }

  function phaseRecords() {
    return {
      overall: emptyRecord(),
      regular: emptyRecord(),
      playoffs: emptyRecord()
    };
  }

  function normalizePhase(phase) {
    const value = String(phase || "regular")
      .trim()
      .toLowerCase();

    return value.startsWith("playoff")
      ? "playoffs"
      : "regular";
  }

  function calculateGamePoints(game, scoring) {
    if (typeof game.pointsOverride === "number") {
      return game.pointsOverride;
    }

    if (game.defaultLoss === true) {
      return scoring.defaultLoss ?? 0;
    }

    if (game.result === "W") {
      return scoring.win ?? 10;
    }

    if (game.result === "L") {
      return scoring.loss ?? 5;
    }

    if (game.result === "T") {
      return scoring.tie ?? 7;
    }

    return 0;
  }

  function addGame(record, game, points) {
    if (!["W", "L", "T"].includes(game.result)) {
      return;
    }

    if (game.result === "W") record.wins++;
    if (game.result === "L") record.losses++;
    if (game.result === "T") record.ties++;

    record.gamesPlayed++;
    record.points += points;
  }

  function addToPhases(records, game, points) {
    const phase = normalizePhase(game.phase);

    addGame(records.overall, game, points);
    addGame(records[phase], game, points);
  }

  function formatRecord(record) {
    return `${record.wins}-${record.losses}-${record.ties}`;
  }

  function winPercentage(record) {
    if (!record.gamesPlayed) return 0;

    return (
      record.wins + record.ties * 0.5
    ) / record.gamesPlayed;
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getElement(id) {
    return document.getElementById(id);
  }

  /* ---------- Create Statistics Structure ---------- */

  const stats = {
    records: phaseRecords(),

    draws: {
      early: phaseRecords(),
      late: phaseRecords()
    },

    sheets: {
      1: phaseRecords(),
      2: phaseRecords(),
      3: phaseRecords()
    },

    rocks: {
      1: {
        yellow: phaseRecords(),
        red: phaseRecords()
      },
      2: {
        yellow: phaseRecords(),
        red: phaseRecords()
      },
      3: {
        yellow: phaseRecords(),
        red: phaseRecords()
      }
    },

    players: {},
    lineups: {},
    games: [],
    seasons: []
  };

  regularPlayers.forEach((name) => {
    stats.players[name] = 0;
  });

  /* ---------- Process All Seasons ---------- */

  seasons.forEach((season) => {
    const games = Array.isArray(season.games)
      ? season.games
      : [];

    stats.seasons.push({
      season: season.season,
      gamesPlayed: games.length
    });

    games.forEach((originalGame) => {
      if (!["W", "L", "T"].includes(originalGame.result)) {
        return;
      }

      const game = {
        ...originalGame,
        season: season.season,
        phase: normalizePhase(originalGame.phase)
      };

      const points = calculateGamePoints(
        game,
        season.scoring || {}
      );

      game.pointsEarned = points;

      stats.games.push(game);

      /* Overall / Regular / Playoff */

      addToPhases(stats.records, game, points);

      /* Draw Performance */

      const draw = String(game.draw || "")
        .trim()
        .toLowerCase();

      if (stats.draws[draw]) {
        addToPhases(stats.draws[draw], game, points);
      }

      /* Sheet Performance */

      const sheet = Number(game.sheet);

      if (stats.sheets[sheet]) {
        addToPhases(stats.sheets[sheet], game, points);
      }

      /* Rock Performance — 2026–27 onward */

      if (season.trackRockColors !== false) {
        const color = String(game.rockColor || "")
          .trim()
          .toLowerCase();

        if (
          stats.rocks[sheet] &&
          stats.rocks[sheet][color]
        ) {
          addToPhases(
            stats.rocks[sheet][color],
            game,
            points
          );
        }
      }

      /* Player Rotation — when recorded */

      if (
        season.trackLineups !== false &&
        Array.isArray(game.lineup) &&
        game.lineup.length > 0
      ) {
        const uniquePlayers = new Set(game.lineup);

        uniquePlayers.forEach((name) => {
          if (!Object.prototype.hasOwnProperty.call(
            stats.players,
            name
          )) {
            stats.players[name] = 0;
          }

          stats.players[name]++;
        });

        /* Lineup Performance
           Preserve throwing order */

        const lineupKey = game.lineup.join("|");

        if (!stats.lineups[lineupKey]) {
          stats.lineups[lineupKey] = {
            lineup: [...game.lineup],
            records: phaseRecords(),
            draws: {
              early: phaseRecords(),
              late: phaseRecords()
            },
            sheets: {
              1: phaseRecords(),
              2: phaseRecords(),
              3: phaseRecords()
            },
            pointsFor: 0,
            pointsAgainst: 0,
            scoredGames: 0,
            differential: 0,
            games: []
          };
        }

        const lineup = stats.lineups[lineupKey];

        addToPhases(lineup.records, game, points);

        if (lineup.draws[draw]) {
          addToPhases(lineup.draws[draw], game, points);
        }

        if (lineup.sheets[sheet]) {
          addToPhases(lineup.sheets[sheet], game, points);
        }

        if (
          typeof game.teamScore === "number" &&
          typeof game.opponentScore === "number"
        ) {
          lineup.pointsFor += game.teamScore;
          lineup.pointsAgainst += game.opponentScore;
          lineup.differential +=
            game.teamScore - game.opponentScore;
          lineup.scoredGames++;
        }

        lineup.games.push(game);
      }
    });
  });

  /* ---------- Lineup Ranking ---------- */

  function lineupName(lineup) {
    return lineup.map((name) => {
      return regularPlayers.includes(name)
        ? name
        : `${name} (Spare)`;
    }).join(" – ");
  }

  function sortedLineups() {
    return Object.values(stats.lineups).sort((a, b) => {
      const ar = a.records.overall;
      const br = b.records.overall;

      if (br.points !== ar.points) {
        return br.points - ar.points;
      }

      const percentageDifference =
        winPercentage(br) - winPercentage(ar);

      if (percentageDifference !== 0) {
        return percentageDifference;
      }

      if (b.differential !== a.differential) {
        return b.differential - a.differential;
      }

      if (br.gamesPlayed !== ar.gamesPlayed) {
        return br.gamesPlayed - ar.gamesPlayed;
      }

      return lineupName(a.lineup).localeCompare(
        lineupName(b.lineup)
      );
    });
  }

  /* ---------- Shared Display Functions ---------- */

  function recordBreakdown(records, showPoints = false) {
    return `
      <div class="overall-phase-grid">
        ${phaseNames.map((phase) => {
          const record = records[phase];

          return `
            <div class="overall-phase-box">
              <span class="overall-phase-label">
                ${phaseLabels[phase]}
              </span>

              <strong>${formatRecord(record)}</strong>

              ${showPoints ? `
  <small>
    ${record.gamesPlayed} games
  </small>
  <small>
    ${record.points} points
  </small>
` : `
  <small>${record.gamesPlayed} games</small>
`}
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  /* ---------- Main Record ---------- */

  function renderOverallRecords() {
    const container = getElement("overall-record-summary");
    if (!container) return;

    container.innerHTML = recordBreakdown(
      stats.records,
      true
    );
  }

  /* ---------- Draw Performance ---------- */

  function renderDrawPerformance() {
    const container = getElement(
      "overall-draw-performance"
    );

    if (!container) return;

    container.innerHTML = `
      <div class="overall-breakdown-list">
        <section class="overall-breakdown-group">
          <h3>Early Draw <small>7:00 PM</small></h3>
          ${recordBreakdown(stats.draws.early)}
        </section>

        <section class="overall-breakdown-group">
          <h3>Late Draw <small>9:15 PM</small></h3>
          ${recordBreakdown(stats.draws.late)}
        </section>
      </div>
    `;
  }

  /* ---------- Sheet Performance ---------- */

  function renderSheetPerformance() {
    const container = getElement(
      "overall-sheet-performance"
    );

    if (!container) return;

    container.innerHTML = `
      <div class="overall-breakdown-list">
        ${[1, 2, 3].map((sheet) => `
          <section class="overall-breakdown-group">
            <h3>Sheet ${sheet}</h3>
            ${recordBreakdown(stats.sheets[sheet])}
          </section>
        `).join("")}
      </div>
    `;
  }

  /* ---------- Rock Performance ---------- */

  function renderRockPerformance() {
    const container = getElement(
      "overall-rock-performance"
    );

    if (!container) return;

    container.innerHTML = `
      <div class="overall-breakdown-list">
        ${[1, 2, 3].map((sheet) => `
          <section class="overall-breakdown-group">
            <h3>Sheet ${sheet}</h3>

            <div class="overall-rock-group">
              <div class="overall-rock-heading">
                <span class="rock-color-dot yellow-rock-dot"></span>
                <strong>Yellow Rocks</strong>
              </div>

              ${recordBreakdown(
                stats.rocks[sheet].yellow
              )}

              <div class="overall-rock-heading">
                <span class="rock-color-dot red-rock-dot"></span>
                <strong>Red Rocks</strong>
              </div>

              ${recordBreakdown(
                stats.rocks[sheet].red
              )}
            </div>
          </section>
        `).join("")}
      </div>
    `;
  }

  /* ---------- Player Rotation ---------- */

  function renderPlayerRotation() {
    const container = getElement(
      "overall-player-games"
    );

    if (!container) return;

    const players = Object.entries(stats.players)
      .map(([name, gamesPlayed]) => ({
        name,
        gamesPlayed,
        spare: !regularPlayers.includes(name)
      }))
      .sort((a, b) => {
        if (b.gamesPlayed !== a.gamesPlayed) {
          return b.gamesPlayed - a.gamesPlayed;
        }

        if (a.spare !== b.spare) {
          return a.spare ? 1 : -1;
        }

        if (!a.spare) {
          return (
            regularPlayers.indexOf(a.name) -
            regularPlayers.indexOf(b.name)
          );
        }

        return a.name.localeCompare(b.name);
      });

    container.innerHTML = players.map((player) => `
      <div class="player-games-row">
        <span>
          ${escapeHTML(player.name)}
          ${player.spare ? "(Spare)" : ""}
        </span>

        <strong>${player.gamesPlayed}</strong>
      </div>
    `).join("");
  }

  /* ---------- Top 5 Lineups ---------- */

  function renderTopLineups() {
    const container = getElement(
      "overall-top-lineups"
    );

    if (!container) return;

    const topFive = sortedLineups().slice(0, 5);

    if (!topFive.length) {
      container.innerHTML = `
        <div class="empty-state">
          <p>No lineup statistics are available yet.</p>
        </div>
      `;

      return;
    }

    container.innerHTML = topFive.map((lineup, index) => {
      const record = lineup.records.overall;

      return `
        <div class="lineup-performance-row">
          <div>
            <span class="lineup-performance-name">
              ${index + 1}.
              ${escapeHTML(lineupName(lineup.lineup))}
            </span>

            <small>
              ${record.points} points ·
              ${record.gamesPlayed}
              ${record.gamesPlayed === 1 ? "game" : "games"}
            </small>
          </div>

          <strong>${formatRecord(record)}</strong>
        </div>
      `;
    }).join("");
  }

  /* ---------- Expose Data for Full Lineup Page ---------- */

  window.TeamNorthamOverall = {
    stats,
    sortedLineups,
    formatRecord,
    lineupName,
    normalizePhase,
    escapeHTML
  };

  /* ---------- Render Overall Statistics ---------- */

  renderOverallRecords();
  renderDrawPerformance();
  renderSheetPerformance();
  renderRockPerformance();
  renderPlayerRotation();
  renderTopLineups();

})();
