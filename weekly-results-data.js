const weeklyResults = [
  /*
    Add one object after each week of league play.

    Example:

    {
      week: 1,
      date: "2026-10-01",
      displayDate: "October 1, 2026",
      phase: "regular",

      games: [
        {
          draw: "early",
          time: "7:00 PM",
          sheet: 1,
          teamA: 1,
          teamB: 2,
          winner: 1
        },
        {
          draw: "early",
          time: "7:00 PM",
          sheet: 2,
          teamA: 4,
          teamB: 5,
          winner: 5
        },
        {
          draw: "early",
          time: "7:00 PM",
          sheet: 3,
          teamA: 8,
          teamB: 9,
          winner: 8
        },
        {
          draw: "late",
          time: "9:15 PM",
          sheet: 1,
          teamA: 7,
          teamB: 3,
          winner: 7
        },
        {
          draw: "late",
          time: "9:15 PM",
          sheet: 2,
          teamA: 6,
          teamB: 10,
          winner: 10
        },
        {
          draw: "late",
          time: "9:15 PM",
          sheet: 3,
          teamA: 11,
          teamB: 12,
          winner: 11
        }
      ],

      teamNortham: {
        opponent: 3,
        result: "W",
        teamScore: 8,
        opponentScore: 5,
        ends: 7,
        draw: "late",
        time: "9:15 PM",
        sheet: 1,
        rockColor: "Red",
        lineup: ["Jason", "Jeff", "Tom", "Mike"],
        notes: ""
      }
    }

    Winner values:

    winner: 7
    winner: "tie"
    winner: null

    Use null only when the game has not been played,
    was postponed, or the result is not yet known.
  */
];
