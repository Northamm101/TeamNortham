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

function recordDefaultLoss(standing) {
  standing.losses += 1;
  standing.gamesPlayed += 1;
  standing.points += standingsScoring.defaultLoss;
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

  /*
    A rescheduled game does not count in the standings
    until a winner or tie is entered later.
  */
  if (
    game.resultType === "rescheduled" &&
    !game.winner
  ) {
    return;
  }

  if (game.resultType === "tie") {
    recordTie(teamA);
    recordTie(teamB);
    return;
  }

  if (
    game.resultType === "default" &&
    game.winner === game.teamA
  ) {
    recordWin(teamA);
    recordDefaultLoss(teamB);
    return;
  }

  if (
    game.resultType === "default" &&
    game.winner === game.teamB
  ) {
    recordDefaultLoss(teamA);
    recordWin(teamB);
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
  }
}

function getCompletedLeagueGames() {
  const completedGames = [];

  leagueSchedule.forEach((week) => {
    const games = [
      ...(week.earlyGames || []),
      ...(week.lateGames || [])
    ];

    games.forEach((game) => {
      const isCompletedTie =
        game.resultType === "tie";

      const hasWinner =
        game.winner === game.teamA ||
        game.winner === game.teamB;

      if (isCompletedTie || hasWinner) {
        completedGames.push(game);
      }
    });
  });

  return completedGames;
}

function createHeadToHeadStanding(teamNumber) {
  return {
    team: teamNumber,
    wins: 0,
    losses: 0,
    ties: 0,
    gamesPlayed: 0,
    points: 0
  };
}

function calculateHeadToHeadStandings(
  tiedTeams,
  completedGames
) {
  const tiedTeamNumbers = new Set(
    tiedTeams.map((standing) => standing.team)
  );

  const headToHeadStandings = {};

  tiedTeams.forEach((standing) => {
    headToHeadStandings[standing.team] =
      createHeadToHeadStanding(standing.team);
  });

  completedGames.forEach((game) => {
    if (
      !tiedTeamNumbers.has(game.teamA) ||
      !tiedTeamNumbers.has(game.teamB)
    ) {
      return;
    }

    processStandingGame(
      headToHeadStandings,
      game
    );
  });

  return headToHeadStandings;
}

function sortTiedStandings(
  tiedStandings,
  completedGames
) {
  if (tiedStandings.length <= 1) {
    return tiedStandings;
  }

  const headToHeadStandings =
    calculateHeadToHeadStandings(
      tiedStandings,
      completedGames
    );

  const totalHeadToHeadGames =
    Object.values(headToHeadStandings)
      .reduce(
        (total, standing) =>
          total + standing.gamesPlayed,
        0
      ) / 2;

  /*
    If none of the tied teams have played one another,
    use Games Played and then Wins.
  */
  if (totalHeadToHeadGames === 0) {
    return [...tiedStandings].sort(
      (standingA, standingB) => {
        if (
          standingB.gamesPlayed !==
          standingA.gamesPlayed
        ) {
          return (
            standingB.gamesPlayed -
            standingA.gamesPlayed
          );
        }

        if (
          standingB.wins !== standingA.wins
        ) {
          return (
            standingB.wins -
            standingA.wins
          );
        }

        return standingA.team - standingB.team;
      }
    );
  }

  /*
    When tied teams have played one another,
    rank them using the mini head-to-head table.
  */
  return [...tiedStandings].sort(
    (standingA, standingB) => {
      const headToHeadA =
        headToHeadStandings[standingA.team];

      const headToHeadB =
        headToHeadStandings[standingB.team];

      if (
        headToHeadB.points !==
        headToHeadA.points
      ) {
        return (
          headToHeadB.points -
          headToHeadA.points
        );
      }

      /*
        Teams that remain tied after head-to-head
        stay in numerical order for display only.

        The team number is not an official tiebreaker.
        A draw-to-the-button may later determine the
        A-Side/B-Side cutoff.
      */
      return standingA.team - standingB.team;
    }
  );
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

  const completedGames =
    getCompletedLeagueGames();

  const standingsByPoints = {};

  Object.values(standings).forEach(
    (standing) => {
      if (!standingsByPoints[standing.points]) {
        standingsByPoints[standing.points] = [];
      }

      standingsByPoints[standing.points].push(
        standing
      );
    }
  );

  const pointTotals = Object.keys(
    standingsByPoints
  )
    .map(Number)
    .sort((pointsA, pointsB) =>
      pointsB - pointsA
    );

  const sortedStandings = pointTotals.flatMap(
    (points) =>
      sortTiedStandings(
        standingsByPoints[points],
        completedGames
      )
  );

  sortedStandings.forEach(
    (standing, index) => {
      standing.rank = index + 1;
    }
  );

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
