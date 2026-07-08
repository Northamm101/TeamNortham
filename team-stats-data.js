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
    notes: "Temporary lineup test"
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
    lineup: ["Jason", "Jeff", "Tom", "Mike"],
    notes: "Temporary lineup test"
  },

  {
    date: "2026-10-15",
    displayDate: "October 15, 2026",
    opponent: 12,
    result: "W",
    teamScore: 9,
    opponentScore: 6,
    draw: "early",
    time: "7:00 PM",
    sheet: 2,
    rockColor: "Red",
    lineup: ["Dallas", "Jeff", "Tom", "Mike"],
    notes: "Temporary lineup test"
  },

  {
    date: "2026-10-22",
    displayDate: "October 22, 2026",
    opponent: 9,
    result: "W",
    teamScore: 7,
    opponentScore: 4,
    draw: "early",
    time: "7:00 PM",
    sheet: 2,
    rockColor: "Yellow",
    lineup: ["Dallas", "Jeff", "Tom", "Mike"],
    notes: "Temporary lineup test"
  },

  {
    date: "2026-10-29",
    displayDate: "October 29, 2026",
    opponent: 1,
    result: "L",
    teamScore: 5,
    opponentScore: 8,
    draw: "late",
    time: "9:15 PM",
    sheet: 2,
    rockColor: "Red",
    lineup: ["Dallas", "Jason", "Jeff", "Mike"],
    notes: "Temporary lineup test"
  },

  {
    date: "2026-11-05",
    displayDate: "November 5, 2026",
    opponent: 10,
    result: "W",
    teamScore: 6,
    opponentScore: 3,
    draw: "early",
    time: "7:00 PM",
    sheet: 2,
    rockColor: "Yellow",
    lineup: ["Jeff", "Tom", "Mike"],
    notes: "Temporary 3-player lineup test"
  }
]
};
