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

  games: [
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
    notes: "Temporary head-to-head test"
  },

  {
    date: "2026-10-08",
    displayDate: "October 8, 2026",
    opponent: 6,
    result: "L",
    teamScore: 4,
    opponentScore: 7,
    draw: "early",
    time: "7:00 PM",
    sheet: 3,
    rockColor: "Yellow",
    lineup: ["Dallas", "Jeff", "Tom", "Mike"],
    notes: "Temporary head-to-head test"
  },

  {
    date: "2027-02-18",
    displayDate: "February 18, 2027",
    opponent: 3,
    result: "W",
    teamScore: 9,
    opponentScore: 6,
    draw: "late",
    time: "9:15 PM",
    sheet: 2,
    rockColor: "Yellow",
    lineup: ["Jason", "Jeff", "Tom", "Mike"],
    phase: "playoffs",
    notes: "Temporary playoff test"
  }
]
};
