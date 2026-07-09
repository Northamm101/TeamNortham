const standingsTeamNumber = 7;

const standingsScoring = {
  win: 10,
  loss: 5,
  tie: 7,
  defaultLoss: 0
};

function createStanding(teamNumber) {
  return {
    team: teamNumber,
    wins: 0,
    losses: 0,
    ties: 0,
    gamesPlayed: 0,
    points: 0,
    rank: teamNumber
  };
}

function createAllStandings() {
  const standings = {};

  for (let teamNumber = 1; teamNumber <= 12; teamNumber += 1) {
    standings[teamNumber] = createStanding(teamNumber);
  }

  return standings;
}

function recordWin(standing) {
  standing.wins += 1;
  standing.gamesPlayed += 1;
  standing.points += standingsScoring.win;
}

function recordLoss(standing) {
  standing.losses += 1;
  standing.gamesPlayed += 1;
  standing.points += standingsScoring.loss;
}

function recordTie(standing) {
  standing.ties += 1;
  standing.gamesPlayed += 1;
  standing.points += standingsScoring.tie;
}

function processStandingGame(standings, game) {
  const teamA = standings[game.teamA];
  const teamB = standings[game.teamB];

  if (!teamA || !teamB) {
    return;
  }

  if (game.winner === game.teamA) {
    recordWin(teamA);
    recordLoss(teamB);
    return;
  }

  if (game.winner === game.teamB) {
    recordLoss(teamA);
    recordWin(teamB);
    return;
  }

  const normalizedWinner =
    typeof game.winner === "string"
      ? game.winner.trim().toLowerCase()
      : "";

  if (
    normalizedWinner === "tie" ||
    normalizedWinner === "t"
  ) {
    recordTie(teamA);
    recordTie(teamB);
  }
}

function calculateLeagueStandings() {
  const standings = createAllStandings();

  leagueSchedule.forEach((week) => {
    const games = [
      ...(week.earlyGames || []),
      ...(week.lateGames || [])
    ];

    games.forEach((game) => {
      processStandingGame(standings, game);
    });
  });

  const sortedStandings = Object.values(standings)
    .sort((standingA, standingB) => {
      if (standingB.points !== standingA.points) {
        return standingB.points - standingA.points;
      }

      if (standingB.wins !== standingA.wins) {
        return standingB.wins - standingA.wins;
      }

      /*
        Until head-to-head tiebreaking is added, teams that
        remain tied stay in numerical team order.
      */
      return standingA.team - standingB.team;
    });

  sortedStandings.forEach((standing, index) => {
    standing.rank = index + 1;
  });

  return sortedStandings;
}

function formatStandingRecord(standing) {
  return (
    `${standing.wins}-` +
    `${standing.losses}-` +
    `${standing.ties}`
  );
}

function renderLeagueStandings(standings) {
  const tableBody =
    document.getElementById("league-standings-body");

  if (!tableBody) {
    return;
  }

  tableBody.innerHTML = standings
    .map((standing) => {
      const rowClass =
        standing.team === standingsTeamNumber
          ? ' class="team-northam-standing"'
          : "";

      return `
        <tr${rowClass}>
          <td>${standing.rank}</td>
          <td>${standing.team}</td>
          <td>${standing.gamesPlayed}</td>
          <td>${formatStandingRecord(standing)}</td>
          <td>${standing.points}</td>
        </tr>
      `;
    })
    .join("");
}

function renderTeamStandingSnapshot(standings) {
  const teamStanding = standings.find(
    (standing) =>
      standing.team === standingsTeamNumber
  );

  if (!teamStanding) {
    return;
  }

  const rankElement =
    document.getElementById("snapshot-rank");

  const gamesPlayedElement =
    document.getElementById(
      "snapshot-games-played"
    );

  const recordElement =
    document.getElementById("snapshot-record");

  const pointsElement =
    document.getElementById("snapshot-points");

  if (rankElement) {
    rankElement.textContent = teamStanding.rank;
  }

  if (gamesPlayedElement) {
    gamesPlayedElement.textContent =
      teamStanding.gamesPlayed;
  }

  if (recordElement) {
    recordElement.textContent =
      formatStandingRecord(teamStanding);
  }

  if (pointsElement) {
    pointsElement.textContent =
      teamStanding.points;
  }
}

const calculatedLeagueStandings =
  calculateLeagueStandings();

renderLeagueStandings(calculatedLeagueStandings);

renderTeamStandingSnapshot(
  calculatedLeagueStandings
);
