const teamStats = {
  scoring: {
    win: 10,
    loss: 5,
    tie: 7,
    defaultLoss: 0
  },

  roster: [
    { name: "Jason", rosterOrder: 1 },
    { name: "Jeff", rosterOrder: 2 },
    { name: "Tom", rosterOrder: 3 },
    { name: "Mike", rosterOrder: 4 },
    { name: "Dallas", rosterOrder: 5 }
  ],

  /*
    Add one object here after each Team Northam game.

    Example:

    {
      date: "2026-10-01",
      displayDate: "October 1, 2026",
      opponent: 3,
      result: "W",
      teamScore: 8,
      opponentScore: 5,
      draw: "late",
      time: "9:15 PM",
      sheet: 1,
      rockColor: "Red",
      lineup: ["Jason", "Jeff", "Tom", "Mike"],
      notes: ""
    }
  */

  games: []
};
