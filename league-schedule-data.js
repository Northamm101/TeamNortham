const leagueSchedule = [
  {
    date: "2026-10-01",
    displayDate: "October 1, 2026",
    fiftyFiftyTeam: null,
    byeTeam: 2,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 7, teamB: 6, winner: null },
      { sheet: 2, teamA: 1, teamB: 8, winner: null },
      { sheet: 3, teamA: 10, teamB: 3, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 9, teamB: 11, winner: null },
      { sheet: 2, teamA: 4, teamB: 5, winner: null }
    ]
  },

  {
    date: "2026-10-08",
    displayDate: "October 8, 2026",
    fiftyFiftyTeam: 1,
    byeTeam: 9,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 11, teamB: 1, winner: null },
      { sheet: 2, teamA: 7, teamB: 3, winner: null },
      { sheet: 3, teamA: 8, teamB: 10, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 4, teamB: 6, winner: null },
      { sheet: 2, teamA: 2, teamB: 5, winner: null }
    ]
  },

  {
    date: "2026-10-15",
    displayDate: "October 15, 2026",
    fiftyFiftyTeam: 2,
    byeTeam: 11,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 3, teamB: 6, winner: null },
      { sheet: 2, teamA: 4, teamB: 2, winner: null },
      { sheet: 3, teamA: 9, teamB: 1, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 8, teamB: 5, winner: null },
      { sheet: 2, teamA: 10, teamB: 7, winner: null }
    ]
  },

  {
    date: "2026-10-22",
    displayDate: "October 22, 2026",
    fiftyFiftyTeam: 3,
    byeTeam: 4,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 11, teamB: 3, winner: null },
      { sheet: 2, teamA: 10, teamB: 5, winner: null },
      { sheet: 3, teamA: 1, teamB: 6, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 7, teamB: 8, winner: null },
      { sheet: 2, teamA: 2, teamB: 9, winner: null }
    ]
  },

  {
    date: "2026-10-29",
    displayDate: "October 29, 2026",
    fiftyFiftyTeam: 5,
    byeTeam: 9,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 8, teamB: 4, winner: null },
      { sheet: 2, teamA: 3, teamB: 2, winner: null },
      { sheet: 3, teamA: 11, teamB: 5, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 6, teamB: 10, winner: null },
      { sheet: 2, teamA: 1, teamB: 7, winner: null }
    ]
  },

  {
    date: "2026-11-05",
    displayDate: "November 5, 2026",
    fiftyFiftyTeam: 4,
    byeTeam: 3,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 7, teamB: 9, winner: null },
      { sheet: 2, teamA: 1, teamB: 4, winner: null },
      { sheet: 3, teamA: 10, teamB: 6, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 8, teamB: 11, winner: null },
      { sheet: 2, teamA: 2, teamB: 5, winner: null }
    ]
  },

  {
    date: "2026-11-12",
    displayDate: "November 12, 2026",
    fiftyFiftyTeam: 6,
    byeTeam: 11,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 6, teamB: 9, winner: null },
      { sheet: 2, teamA: 5, teamB: 3, winner: null },
      { sheet: 3, teamA: 8, teamB: 1, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 2, teamB: 7, winner: null },
      { sheet: 2, teamA: 10, teamB: 4, winner: null }
    ]
  },

  {
    date: "2026-11-19",
    displayDate: "November 19, 2026",
    fiftyFiftyTeam: 7,
    byeTeam: 8,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 1, teamB: 5, winner: null },
      { sheet: 2, teamA: 10, teamB: 7, winner: null },
      { sheet: 3, teamA: 4, teamB: 11, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 6, teamB: 2, winner: null },
      { sheet: 2, teamA: 3, teamB: 9, winner: null }
    ]
  },

  {
    date: "2026-11-26",
    displayDate: "November 26, 2026",
    fiftyFiftyTeam: 8,
    byeTeam: 10,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 11, teamB: 2, winner: null },
      { sheet: 2, teamA: 4, teamB: 9, winner: null },
      { sheet: 3, teamA: 5, teamB: 7, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 1, teamB: 3, winner: null },
      { sheet: 2, teamA: 6, teamB: 8, winner: null }
    ]
  },

  {
    date: "2026-12-03",
    displayDate: "December 3, 2026",
    fiftyFiftyTeam: 9,
    byeTeam: 5,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 4, teamB: 7, winner: null },
      { sheet: 2, teamA: 2, teamB: 11, winner: null },
      { sheet: 3, teamA: 8, teamB: 3, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 6, teamB: 9, winner: null },
      { sheet: 2, teamA: 10, teamB: 1, winner: null }
    ]
  },

  {
    date: "2026-12-10",
    displayDate: "December 10, 2026",
    fiftyFiftyTeam: 10,
    byeTeam: 7,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 9, teamB: 8, winner: null },
      { sheet: 2, teamA: 5, teamB: 6, winner: null },
      { sheet: 3, teamA: 1, teamB: 2, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 11, teamB: 10, winner: null },
      { sheet: 2, teamA: 3, teamB: 4, winner: null }
    ]
  },

  {
    date: "2026-12-17",
    displayDate: "December 17, 2026",
    fiftyFiftyTeam: 11,
    byeTeam: 4,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 1, teamB: 5, winner: null },
      { sheet: 2, teamA: 3, teamB: 7, winner: null },
      { sheet: 3, teamA: 8, teamB: 10, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 2, teamB: 6, winner: null },
      { sheet: 2, teamA: 9, teamB: 11, winner: null }
    ]
  },

  {
    date: "2027-01-07",
    displayDate: "January 7, 2027",
    fiftyFiftyTeam: 2,
    byeTeam: 1,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 3, teamB: 10, winner: null },
      { sheet: 2, teamA: 6, teamB: 9, winner: null },
      { sheet: 3, teamA: 2, teamB: 4, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 11, teamB: 7, winner: null },
      { sheet: 2, teamA: 5, teamB: 8, winner: null }
    ]
  },

  {
    date: "2027-01-14",
    displayDate: "January 14, 2027",
    fiftyFiftyTeam: 1,
    byeTeam: 6,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 8, teamB: 1, winner: null },
      { sheet: 2, teamA: 4, teamB: 11, winner: null },
      { sheet: 3, teamA: 10, teamB: 7, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 5, teamB: 3, winner: null },
      { sheet: 2, teamA: 2, teamB: 9, winner: null }
    ]
  },

  {
    date: "2027-01-21",
    displayDate: "January 21, 2027",
    fiftyFiftyTeam: 3,
    byeTeam: 2,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 3, teamB: 8, winner: null },
      { sheet: 2, teamA: 5, teamB: 7, winner: null },
      { sheet: 3, teamA: 9, teamB: 4, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 10, teamB: 1, winner: null },
      { sheet: 2, teamA: 6, teamB: 11, winner: null }
    ]
  },

  {
    date: "2027-01-28",
    displayDate: "January 28, 2027",
    fiftyFiftyTeam: 4,
    byeTeam: 7,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 4, teamB: 6, winner: null },
      { sheet: 2, teamA: 2, teamB: 11, winner: null },
      { sheet: 3, teamA: 9, teamB: 10, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 5, teamB: 8, winner: null },
      { sheet: 2, teamA: 1, teamB: 3, winner: null }
    ]
  },

  {
    date: "2027-02-04",
    displayDate: "February 4, 2027",
    fiftyFiftyTeam: 5,
    byeTeam: 10,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 8, teamB: 2, winner: null },
      { sheet: 2, teamA: 5, teamB: 9, winner: null },
      { sheet: 3, teamA: 11, teamB: 3, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 1, teamB: 6, winner: null },
      { sheet: 2, teamA: 4, teamB: 7, winner: null }
    ]
  },

  {
    date: "2027-02-11",
    displayDate: "February 11, 2027",
    fiftyFiftyTeam: 6,
    byeTeam: 1,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 10, teamB: 2, winner: null },
      { sheet: 2, teamA: 11, teamB: 9, winner: null },
      { sheet: 3, teamA: 5, teamB: 6, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 3, teamB: 4, winner: null },
      { sheet: 2, teamA: 7, teamB: 8, winner: null }
    ]
  },

  {
    date: "2027-02-18",
    displayDate: "February 18, 2027",
    playoffPlaceholder: true
  },

  {
    date: "2027-02-25",
    displayDate: "February 25, 2027",
    playoffPlaceholder: true
  },

  {
    date: "2027-03-04",
    displayDate: "March 4, 2027",
    playoffPlaceholder: true
  },

  {
    date: "2027-03-18",
    displayDate: "March 18, 2027",
    playoffPlaceholder: true
  },

  {
    date: "2027-03-25",
    displayDate: "March 25, 2027",
    playoffPlaceholder: true
  }
];

const teamNames = {
  1: "Team 1",
  2: "Team 2",
  3: "Team 3",
  4: "Team 4",
  5: "Team 5",
  6: "Team 6",
  7: "Team 7",
  8: "Team 8",
  9: "Team 9",
  10: "Team 10",
  11: "Team 11"
};

const teamNorthamNumber = 7;
