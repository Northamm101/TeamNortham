function getWeeklyResultByDate(date) {
  return weeklyResults.find(
    (week) => week.date === date
  ) || null;
}

function getAllLeagueGamesFromWeeklyResults() {
  return weeklyResults.flatMap((week) =>
    (week.games || []).map((game) => ({
      ...game,
      week: week.week,
      date: week.date,
      displayDate: week.displayDate,
      phase: week.phase || "regular"
    }))
  );
}

function getTeamNorthamGamesFromWeeklyResults() {
  return weeklyResults
    .filter((week) => week.teamNortham)
    .map((week) => ({
      date: week.date,
      displayDate: week.displayDate,
      phase: week.phase || "regular",
      ...week.teamNortham
    }));
}

function applyWeeklyResultsToLeagueSchedule() {
  if (
    typeof leagueSchedule === "undefined" ||
    !Array.isArray(leagueSchedule)
  ) {
    return;
  }

  weeklyResults.forEach((weeklyResult) => {
    const scheduledWeek = leagueSchedule.find(
      (week) => week.date === weeklyResult.date
    );

    if (!scheduledWeek) {
      return;
    }

    (weeklyResult.games || []).forEach((resultGame) => {
      const drawGames =
        resultGame.draw === "early"
          ? scheduledWeek.earlyGames
          : scheduledWeek.lateGames;

      if (!Array.isArray(drawGames)) {
        return;
      }

      const scheduledGame = drawGames.find((game) => {
        const sameSheet =
          game.sheet === resultGame.sheet;

        const sameTeams =
          (
            game.teamA === resultGame.teamA &&
            game.teamB === resultGame.teamB
          ) ||
          (
            game.teamA === resultGame.teamB &&
            game.teamB === resultGame.teamA
          );

        return sameSheet && sameTeams;
      });

      if (!scheduledGame) {
        return;
      }

      scheduledGame.winner = resultGame.winner;
scheduledGame.resultType =
  resultGame.resultType || "win";
scheduledGame.forfeitingTeam =
  resultGame.forfeitingTeam || null;
scheduledGame.rescheduled =
  resultGame.rescheduled === true;
scheduledGame.rescheduledDate =
  resultGame.rescheduledDate || null;
scheduledGame.rescheduledDisplayDate =
  resultGame.rescheduledDisplayDate || null;
    });
  });
}

function applyWeeklyResultsToTeamStats() {
  if (
    typeof teamStats === "undefined" ||
    !teamStats ||
    !Array.isArray(teamStats.games)
  ) {
    return;
  }

  teamStats.games =
    getTeamNorthamGamesFromWeeklyResults();
}
