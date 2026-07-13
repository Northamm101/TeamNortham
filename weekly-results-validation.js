function validateWeeklyResults() {
  const errors = [];

  if (
    typeof weeklyResults === "undefined" ||
    !Array.isArray(weeklyResults)
  ) {
    errors.push("The weeklyResults array could not be found.");
    return errors;
  }

  weeklyResults.forEach((week, weekIndex) => {
    const weekLabel =
      week.week || weekIndex + 1;

    const games = Array.isArray(week.games)
      ? week.games
      : [];

    if (!week.date) {
      errors.push(
        `Week ${weekLabel}: Missing game date.`
      );
    }

    if (games.length !== 6) {
      errors.push(
        `Week ${weekLabel}: Expected 6 league games but found ${games.length}.`
      );
    }

    const teamsUsed = [];
    const drawSheets = {
      early: [],
      late: []
    };

    games.forEach((game, gameIndex) => {
      const gameLabel =
        `Week ${weekLabel}, game ${gameIndex + 1}`;

      const validDraws = [
        "early",
        "late"
      ];

      if (!validDraws.includes(game.draw)) {
        errors.push(
          `${gameLabel}: Draw must be "early" or "late".`
        );
      }

      if (
        !Number.isInteger(game.sheet) ||
        game.sheet < 1 ||
        game.sheet > 3
      ) {
        errors.push(
          `${gameLabel}: Sheet must be 1, 2, or 3.`
        );
      }

      if (
        game.draw === "early" ||
        game.draw === "late"
      ) {
        drawSheets[game.draw].push(game.sheet);
      }

      [game.teamA, game.teamB].forEach((teamNumber) => {
        if (
          !Number.isInteger(teamNumber) ||
          teamNumber < 1 ||
          teamNumber > 12
        ) {
          errors.push(
            `${gameLabel}: Team numbers must be between 1 and 12.`
          );
        }

        teamsUsed.push(teamNumber);
      });

      if (game.teamA === game.teamB) {
        errors.push(
          `${gameLabel}: A team cannot play itself.`
        );
      }

      const validResultTypes = [
        "win",
        "tie",
        "default",
        "rescheduled"
      ];

      if (
        game.resultType &&
        !validResultTypes.includes(game.resultType)
      ) {
        errors.push(
          `${gameLabel}: Invalid resultType "${game.resultType}".`
        );
      }

      if (game.resultType === "tie" && game.winner !== null) {
        errors.push(
          `${gameLabel}: A tied game must have winner: null.`
        );
      }

      if (
        game.resultType === "win" &&
        game.winner !== game.teamA &&
        game.winner !== game.teamB
      ) {
        errors.push(
          `${gameLabel}: Winner must be one of the two teams.`
        );
      }

      if (game.resultType === "default") {
        if (
          game.winner !== game.teamA &&
          game.winner !== game.teamB
        ) {
          errors.push(
            `${gameLabel}: Default winner must be one of the two teams.`
          );
        }

        if (
          game.forfeitingTeam !== game.teamA &&
          game.forfeitingTeam !== game.teamB
        ) {
          errors.push(
            `${gameLabel}: Forfeiting team must be one of the two teams.`
          );
        }

        if (game.winner === game.forfeitingTeam) {
          errors.push(
            `${gameLabel}: Winner and forfeiting team cannot be the same.`
          );
        }
      }

      if (
        game.resultType === "rescheduled" &&
        game.winner !== null
      ) {
        errors.push(
          `${gameLabel}: A rescheduled game must have winner: null.`
        );
      }
    });

    ["early", "late"].forEach((draw) => {
      const sheets = drawSheets[draw];

      const uniqueSheets =
        new Set(sheets);

      if (
        sheets.length !== 3 ||
        uniqueSheets.size !== 3
      ) {
        errors.push(
          `Week ${weekLabel}: The ${draw} draw must use Sheets 1, 2, and 3 exactly once.`
        );
      }
    });

    const validTeamsUsed = teamsUsed.filter(
      (teamNumber) =>
        Number.isInteger(teamNumber) &&
        teamNumber >= 1 &&
        teamNumber <= 12
    );

    const uniqueTeamsUsed =
      new Set(validTeamsUsed);

    if (
      validTeamsUsed.length === 12 &&
      uniqueTeamsUsed.size !== 12
    ) {
      errors.push(
        `Week ${weekLabel}: One or more teams appear more than once.`
      );
    }

    const teamSevenGames = games.filter(
      (game) =>
        game.teamA === 7 ||
        game.teamB === 7
    );

    if (teamSevenGames.length !== 1) {
      errors.push(
        `Week ${weekLabel}: Team 7 must appear exactly once.`
      );
    }

    if (!week.teamNortham) {
      errors.push(
        `Week ${weekLabel}: Missing Team Northam game details.`
      );

      return;
    }

    const teamSevenGame =
      teamSevenGames[0];

    if (!teamSevenGame) {
      return;
    }

    const expectedOpponent =
      teamSevenGame.teamA === 7
        ? teamSevenGame.teamB
        : teamSevenGame.teamA;

    if (
      Number(week.teamNortham.opponent) !==
      expectedOpponent
    ) {
      errors.push(
        `Week ${weekLabel}: Team Northam opponent does not match the league schedule result.`
      );
    }

    if (
      week.teamNortham.draw !==
      teamSevenGame.draw
    ) {
      errors.push(
        `Week ${weekLabel}: Team Northam draw does not match the league game.`
      );
    }

    if (
      week.teamNortham.sheet !==
      teamSevenGame.sheet
    ) {
      errors.push(
        `Week ${weekLabel}: Team Northam sheet does not match the league game.`
      );
    }

    const expectedResult =
      teamSevenGame.resultType === "tie"
        ? "T"
        : teamSevenGame.winner === 7
          ? "W"
          : teamSevenGame.winner === null
            ? null
            : "L";

    if (
      expectedResult &&
      week.teamNortham.result !== expectedResult
    ) {
      errors.push(
        `Week ${weekLabel}: Team Northam result does not match the league winner.`
      );
    }

    if (
      !Array.isArray(week.teamNortham.lineup) ||
      week.teamNortham.lineup.length < 3 ||
      week.teamNortham.lineup.length > 4
    ) {
      errors.push(
        `Week ${weekLabel}: Team Northam lineup must contain 3 or 4 players.`
      );
    }

    if (
      Array.isArray(week.teamNortham.lineup)
    ) {
      const uniqueLineup =
        new Set(week.teamNortham.lineup);

      if (
        uniqueLineup.size !==
        week.teamNortham.lineup.length
      ) {
        errors.push(
          `Week ${weekLabel}: A player appears more than once in the lineup.`
        );
      }
    }
  });

  return errors;
}
