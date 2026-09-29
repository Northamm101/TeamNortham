function validateWeeklyResults() {
  const errors = [];

  if (
    typeof weeklyResults === "undefined" ||
    !Array.isArray(weeklyResults)
  ) {
    errors.push(
      "The weeklyResults array could not be found."
    );

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

    if (games.length !== 5) {
      errors.push(
        `Week ${weekLabel}: Expected 5 league games but found ${games.length}.`
      );
    }

    if (
      !Number.isInteger(week.byeTeam) ||
      week.byeTeam < 1 ||
      week.byeTeam > 11
    ) {
      errors.push(
        `Week ${weekLabel}: Bye team must be a team number between 1 and 11.`
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
        drawSheets[game.draw].push(
          game.sheet
        );
      }

      [game.teamA, game.teamB].forEach(
        (teamNumber) => {
          if (
            !Number.isInteger(teamNumber) ||
            teamNumber < 1 ||
            teamNumber > 11
          ) {
            errors.push(
              `${gameLabel}: Team numbers must be between 1 and 11.`
            );
          }

          teamsUsed.push(teamNumber);
        }
      );

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
        !validResultTypes.includes(
          game.resultType
        )
      ) {
        errors.push(
          `${gameLabel}: Invalid resultType "${game.resultType}".`
        );
      }

      if (
        game.resultType === "tie" &&
        game.winner !== null
      ) {
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

      if (
        game.resultType === "default"
      ) {
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

        if (
          game.winner ===
          game.forfeitingTeam
        ) {
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

    const earlySheets =
      drawSheets.early;

    const uniqueEarlySheets =
      new Set(earlySheets);

    if (
      earlySheets.length !== 3 ||
      uniqueEarlySheets.size !== 3 ||
      !uniqueEarlySheets.has(1) ||
      !uniqueEarlySheets.has(2) ||
      !uniqueEarlySheets.has(3)
    ) {
      errors.push(
        `Week ${weekLabel}: The early draw must use Sheets 1, 2, and 3 exactly once.`
      );
    }

    const lateSheets =
      drawSheets.late;

    const uniqueLateSheets =
      new Set(lateSheets);

    if (
      lateSheets.length !== 2 ||
      uniqueLateSheets.size !== 2 ||
      !uniqueLateSheets.has(1) ||
      !uniqueLateSheets.has(2)
    ) {
      errors.push(
        `Week ${weekLabel}: The late draw must use Sheets 1 and 2 exactly once.`
      );
    }

    const validTeamsUsed =
      teamsUsed.filter(
        (teamNumber) =>
          Number.isInteger(teamNumber) &&
          teamNumber >= 1 &&
          teamNumber <= 11
      );

    const uniqueTeamsUsed =
      new Set(validTeamsUsed);

    if (
      validTeamsUsed.length === 10 &&
      uniqueTeamsUsed.size !== 10
    ) {
      errors.push(
        `Week ${weekLabel}: One or more teams appear more than once.`
      );
    }

    if (
      Number.isInteger(week.byeTeam) &&
      uniqueTeamsUsed.has(week.byeTeam)
    ) {
      errors.push(
        `Week ${weekLabel}: The bye team cannot also appear in a game.`
      );
    }

    if (
      validTeamsUsed.length === 10 &&
      uniqueTeamsUsed.size === 10 &&
      Number.isInteger(week.byeTeam)
    ) {
      const missingTeams = [];

      for (
        let teamNumber = 1;
        teamNumber <= 11;
        teamNumber += 1
      ) {
        if (
          !uniqueTeamsUsed.has(teamNumber)
        ) {
          missingTeams.push(teamNumber);
        }
      }

      if (
        missingTeams.length !== 1 ||
        missingTeams[0] !== week.byeTeam
      ) {
        errors.push(
          `Week ${weekLabel}: Bye team does not match the team missing from the five games.`
        );
      }
    }

    const teamSevenGames =
      games.filter(
        (game) =>
          game.teamA === 7 ||
          game.teamB === 7
      );

    if (week.byeTeam === 7) {
      if (teamSevenGames.length !== 0) {
        errors.push(
          `Week ${weekLabel}: Team 7 is listed as the bye team and must not appear in a game.`
        );
      }

      if (week.teamNortham) {
        errors.push(
          `Week ${weekLabel}: Team Northam game details should not be entered during a Team 7 bye week.`
        );
      }

      return;
    }

    if (teamSevenGames.length !== 1) {
      errors.push(
        `Week ${weekLabel}: Team 7 must appear exactly once unless Team 7 has the bye.`
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
      Number(
        week.teamNortham.opponent
      ) !== expectedOpponent
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
      week.teamNortham.result !==
        expectedResult
    ) {
      errors.push(
        `Week ${weekLabel}: Team Northam result does not match the league winner.`
      );
    }

    if (
      !Array.isArray(
        week.teamNortham.lineup
      ) ||
      week.teamNortham.lineup.length < 3 ||
      week.teamNortham.lineup.length > 4
    ) {
      errors.push(
        `Week ${weekLabel}: Team Northam lineup must contain 3 or 4 players.`
      );
    }

    if (
      Array.isArray(
        week.teamNortham.lineup
      )
    ) {
      const uniqueLineup =
        new Set(
          week.teamNortham.lineup
        );

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
