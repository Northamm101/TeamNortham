const leagueSchedule = [
  {
    date: "2026-10-01",
    displayDate: "October 1, 2026",
    fiftyFiftyTeam: null,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 12, teamB: 1, winner: null },
      { sheet: 2, teamA: 9, teamB: 11, winner: null },
      { sheet: 3, teamA: 2, teamB: 8, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 7, teamB: 3, winner: null },
      { sheet: 2, teamA: 10, teamB: 5, winner: null },
      { sheet: 3, teamA: 4, teamB: 6, winner: null }
    ]
  },
  {
    date: "2026-10-08",
    displayDate: "October 8, 2026",
    fiftyFiftyTeam: 4,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 4, teamB: 5, winner: null },
      { sheet: 2, teamA: 11, teamB: 3, winner: null },
      { sheet: 3, teamA: 7, teamB: 6, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 1, teamB: 8, winner: null },
      { sheet: 2, teamA: 2, teamB: 9, winner: null },
      { sheet: 3, teamA: 10, teamB: 12, winner: null }
    ]
  },
  {
    date: "2026-10-15",
    displayDate: "October 15, 2026",
    fiftyFiftyTeam: 1,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 3, teamB: 6, winner: null },
      { sheet: 2, teamA: 12, teamB: 7, winner: null },
      { sheet: 3, teamA: 10, teamB: 1, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 8, teamB: 11, winner: null },
      { sheet: 2, teamA: 9, teamB: 5, winner: null },
      { sheet: 3, teamA: 4, teamB: 2, winner: null }
    ]
  },
  {
    date: "2026-10-22",
    displayDate: "October 22, 2026",
    fiftyFiftyTeam: 2,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 2, teamB: 10, winner: null },
      { sheet: 2, teamA: 7, teamB: 9, winner: null },
      { sheet: 3, teamA: 1, teamB: 6, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 11, teamB: 5, winner: null },
      { sheet: 2, teamA: 8, teamB: 4, winner: null },
      { sheet: 3, teamA: 12, teamB: 3, winner: null }
    ]
  },
  {
    date: "2026-10-29",
    displayDate: "October 29, 2026",
    fiftyFiftyTeam: 12,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 9, teamB: 4, winner: null },
      { sheet: 2, teamA: 3, teamB: 2, winner: null },
      { sheet: 3, teamA: 12, teamB: 5, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 10, teamB: 11, winner: null },
      { sheet: 2, teamA: 1, teamB: 7, winner: null },
      { sheet: 3, teamA: 8, teamB: 6, winner: null }
    ]
  },
  {
    date: "2026-11-05",
    displayDate: "November 5, 2026",
    fiftyFiftyTeam: 3,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 3, teamB: 8, winner: null },
      { sheet: 2, teamA: 7, teamB: 10, winner: null },
      { sheet: 3, teamA: 11, teamB: 6, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 2, teamB: 5, winner: null },
      { sheet: 2, teamA: 9, teamB: 12, winner: null },
      { sheet: 3, teamA: 1, teamB: 4, winner: null }
    ]
  },
  {
    date: "2026-11-12",
    displayDate: "November 12, 2026",
    fiftyFiftyTeam: 6,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 6, teamB: 12, winner: null },
      { sheet: 2, teamA: 5, teamB: 3, winner: null },
      { sheet: 3, teamA: 8, teamB: 10, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 9, teamB: 1, winner: null },
      { sheet: 2, teamA: 11, teamB: 4, winner: null },
      { sheet: 3, teamA: 2, teamB: 7, winner: null }
    ]
  },
  {
    date: "2026-11-19",
    displayDate: "November 19, 2026",
    fiftyFiftyTeam: 8,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 1, teamB: 5, winner: null },
      { sheet: 2, teamA: 8, teamB: 9, winner: null },
      { sheet: 3, teamA: 4, teamB: 12, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 11, teamB: 7, winner: null },
      { sheet: 2, teamA: 6, teamB: 2, winner: null },
      { sheet: 3, teamA: 3, teamB: 10, winner: null }
    ]
  },
  {
    date: "2026-11-26",
    displayDate: "November 26, 2026",
    fiftyFiftyTeam: 7,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 11, teamB: 2, winner: null },
      { sheet: 2, teamA: 1, teamB: 3, winner: null },
      { sheet: 3, teamA: 5, teamB: 7, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 8, teamB: 12, winner: null },
      { sheet: 2, teamA: 4, teamB: 10, winner: null },
      { sheet: 3, teamA: 6, teamB: 9, winner: null }
    ]
  },
  {
    date: "2026-12-03",
    displayDate: "December 3, 2026",
    fiftyFiftyTeam: 9,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 4, teamB: 7, winner: null },
      { sheet: 2, teamA: 2, teamB: 12, winner: null },
      { sheet: 3, teamA: 9, teamB: 3, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 6, teamB: 10, winner: null },
      { sheet: 2, teamA: 11, teamB: 1, winner: null },
      { sheet: 3, teamA: 5, teamB: 8, winner: null }
    ]
  },
  {
    date: "2026-12-10",
    displayDate: "December 10, 2026",
    fiftyFiftyTeam: 10,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 10, teamB: 9, winner: null },
      { sheet: 2, teamA: 5, teamB: 6, winner: null },
      { sheet: 3, teamA: 1, teamB: 2, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 7, teamB: 8, winner: null },
      { sheet: 2, teamA: 3, teamB: 4, winner: null },
      { sheet: 3, teamA: 12, teamB: 11, winner: null }
    ]
  },
  {
    date: "2026-12-17",
    displayDate: "December 17, 2026",
    fiftyFiftyTeam: 5,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 1, teamB: 5, winner: null },
      { sheet: 2, teamA: 4, teamB: 8, winner: null },
      { sheet: 3, teamA: 9, teamB: 11, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 10, teamB: 12, winner: null },
      { sheet: 2, teamA: 2, teamB: 6, winner: null },
      { sheet: 3, teamA: 3, teamB: 7, winner: null }
    ]
  },
  {
    date: "2027-01-07",
    displayDate: "January 7, 2027",
    fiftyFiftyTeam: 11,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 6, teamB: 10, winner: null },
      { sheet: 2, teamA: 3, teamB: 11, winner: null },
      { sheet: 3, teamA: 12, teamB: 8, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 2, teamB: 4, winner: null },
      { sheet: 2, teamA: 1, teamB: 7, winner: null },
      { sheet: 3, teamA: 5, teamB: 9, winner: null }
    ]
  },
  {
    date: "2027-01-14",
    displayDate: "January 14, 2027",
    fiftyFiftyTeam: 4,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 9, teamB: 1, winner: null },
      { sheet: 2, teamA: 4, teamB: 12, winner: null },
      { sheet: 3, teamA: 11, teamB: 7, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 5, teamB: 3, winner: null },
      { sheet: 2, teamA: 8, teamB: 6, winner: null },
      { sheet: 3, teamA: 2, teamB: 10, winner: null }
    ]
  },
  {
    date: "2027-01-21",
    displayDate: "January 21, 2027",
    fiftyFiftyTeam: 2,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 8, teamB: 2, winner: null },
      { sheet: 2, teamA: 5, teamB: 7, winner: null },
      { sheet: 3, teamA: 10, teamB: 4, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 6, teamB: 12, winner: null },
      { sheet: 2, teamA: 11, teamB: 1, winner: null },
      { sheet: 3, teamA: 3, teamB: 9, winner: null }
    ]
  },
  {
    date: "2027-01-28",
    displayDate: "January 28, 2027",
    fiftyFiftyTeam: 1,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 4, teamB: 6, winner: null },
      { sheet: 2, teamA: 2, teamB: 12, winner: null },
      { sheet: 3, teamA: 1, teamB: 3, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 7, teamB: 9, winner: null },
      { sheet: 2, teamA: 8, teamB: 10, winner: null },
      { sheet: 3, teamA: 5, teamB: 11, winner: null }
    ]
  },
  {
    date: "2027-02-04",
    displayDate: "February 4, 2027",
    fiftyFiftyTeam: 5,
    earlyTime: "7:00 PM",
    lateTime: "9:15 PM",
    earlyGames: [
      { sheet: 1, teamA: 9, teamB: 2, winner: null },
      { sheet: 2, teamA: 5, teamB: 10, winner: null },
      { sheet: 3, teamA: 8, teamB: 11, winner: null }
    ],
    lateGames: [
      { sheet: 1, teamA: 12, teamB: 3, winner: null },
      { sheet: 2, teamA: 1, teamB: 6, winner: null },
      { sheet: 3, teamA: 4, teamB: 7, winner: null }
    ]
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
  11: "Team 11",
  12: "Team 12"
};

const teamNorthamNumber = 7;
