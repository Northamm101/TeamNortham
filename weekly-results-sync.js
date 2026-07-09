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
