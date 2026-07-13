const weeklyResults = [
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
        teamA: 12,
        teamB: 1,
        resultType: "win",
        winner: 1
      },
      {
        draw: "early",
        time: "7:00 PM",
        sheet: 2,
        teamA: 9,
        teamB: 11,
        resultType: "default",
        winner: 9,
        forfeitingTeam: 11
      },
      {
        draw: "early",
        time: "7:00 PM",
        sheet: 3,
        teamA: 2,
        teamB: 8,
        resultType: "win",
        winner: 8
      },
      {
        draw: "late",
        time: "9:15 PM",
        sheet: 1,
        teamA: 7,
        teamB: 3,
        resultType: "win",
        winner: 7
      },
      {
        draw: "late",
        time: "9:15 PM",
        sheet: 2,
        teamA: 10,
        teamB: 5,
        resultType: "win",
        winner: 10
      },
      {
        draw: "late",
        time: "9:15 PM",
        sheet: 3,
        teamA: 4,
        teamB: 6,
        resultType: "win",
        winner: 6
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
      lineup: [
        "Jason",
        "Jeff",
        "Tom",
        "Mike"
      ],
      notes: "Dallas unavailable."
    }
  },

  {
    week: 2,
    date: "2026-10-08",
    displayDate: "October 8, 2026",
    phase: "regular",

    games: [
      {
        draw: "early",
        time: "7:00 PM",
        sheet: 1,
        teamA: 4,
        teamB: 5,
        resultType: "win",
        winner: 4
      },
      {
        draw: "early",
        time: "7:00 PM",
        sheet: 2,
        teamA: 11,
        teamB: 3,
        resultType: "win",
        winner: 3
      },
      {
        draw: "early",
        time: "7:00 PM",
        sheet: 3,
        teamA: 7,
        teamB: 6,
        resultType: "win",
        winner: 6
      },
      {
        draw: "late",
        time: "9:15 PM",
        sheet: 1,
        teamA: 1,
        teamB: 8,
        resultType: "tie",
        winner: null
      },
      {
        draw: "late",
        time: "9:15 PM",
        sheet: 2,
        teamA: 2,
        teamB: 9,
        resultType: "win",
        winner: 2
      },
      {
        draw: "late",
        time: "9:15 PM",
        sheet: 3,
        teamA: 10,
        teamB: 12,
        resultType: "win",
        winner: 12
      }
    ],

    teamNortham: {
      opponent: 6,
      result: "L",
      teamScore: 4,
      opponentScore: 7,
      ends: 8,
      draw: "early",
      time: "7:00 PM",
      sheet: 3,
      rockColor: "Yellow",
      lineup: [
        "Dallas",
        "Jeff",
        "Tom",
        "Mike"
      ],
      notes: "Jason sitting - available if needed."
    }
  },

  {
    week: 3,
    date: "2026-10-15",
    displayDate: "October 15, 2026",
    phase: "regular",

    games: [
      {
        draw: "early",
        time: "7:00 PM",
        sheet: 1,
        teamA: 3,
        teamB: 6,
        resultType: "win",
        winner: 6
      },
      {
        draw: "early",
        time: "7:00 PM",
        sheet: 2,
        teamA: 12,
        teamB: 7,
        resultType: "win",
        winner: 7
      },
      {
        draw: "early",
        time: "7:00 PM",
        sheet: 3,
        teamA: 10,
        teamB: 1,
        resultType: "win",
        winner: 1
      },
      {
        draw: "late",
        time: "9:15 PM",
        sheet: 1,
        teamA: 8,
        teamB: 11,
        resultType: "win",
        winner: 8
      },
      {
        draw: "late",
        time: "9:15 PM",
        sheet: 2,
        teamA: 9,
        teamB: 5,
        resultType: "tie",
        winner: null
      },
      {
        draw: "late",
        time: "9:15 PM",
        sheet: 3,
        teamA: 4,
        teamB: 2,
        resultType: "win",
        winner: 4
      }
    ],

    teamNortham: {
      opponent: 12,
      result: "W",
      teamScore: 9,
      opponentScore: 6,
      ends: 8,
      draw: "early",
      time: "7:00 PM",
      sheet: 2,
      rockColor: "Red",
      lineup: [
        "Richard",
        "Dallas",
        "Jason",
        "Mike"
      ],
      notes: "Tom and Jeff unavailable. Richard spared at Lead."
    }
  },

  {
    week: 4,
    date: "2026-10-22",
    displayDate: "October 22, 2026",
    phase: "regular",

    games: [
      {
        draw: "early",
        time: "7:00 PM",
        sheet: 1,
        teamA: 2,
        teamB: 10,
        resultType: "win",
        winner: 10
      },
      {
        draw: "early",
        time: "7:00 PM",
        sheet: 2,
        teamA: 7,
        teamB: 9,
        resultType: "tie",
        winner: null
      },
      {
        draw: "early",
        time: "7:00 PM",
        sheet: 3,
        teamA: 1,
        teamB: 6,
        resultType: "win",
        winner: 1
      },
      {
        draw: "late",
        time: "9:15 PM",
        sheet: 1,
        teamA: 11,
        teamB: 5,
        resultType: "win",
        winner: 5
      },
      {
        draw: "late",
        time: "9:15 PM",
        sheet: 2,
        teamA: 8,
        teamB: 4,
        resultType: "win",
        winner: 8
      },
      {
        draw: "late",
        time: "9:15 PM",
        sheet: 3,
        teamA: 12,
        teamB: 3,
        resultType: "rescheduled",
        winner: null,
        rescheduled: true,
        rescheduledDate: null,
        rescheduledDisplayDate: null
      }
    ],

    teamNortham: {
      opponent: 9,
      result: "T",
      teamScore: 6,
      opponentScore: 6,
      ends: 8,
      draw: "early",
      time: "7:00 PM",
      sheet: 2,
      rockColor: "Yellow",
      lineup: [
        "Dallas",
        "Jason",
        "Jeff"
      ],
      notes: "Three-player lineup. Tom unavailable. Mike was last resort and did not play."
    }
  },

  {
    week: 5,
    date: "2026-10-29",
    displayDate: "October 29, 2026",
    phase: "regular",

    games: [
      {
        draw: "early",
        time: "7:00 PM",
        sheet: 1,
        teamA: 9,
        teamB: 4,
        resultType: "win",
        winner: 4
      },
      {
        draw: "early",
        time: "7:00 PM",
        sheet: 2,
        teamA: 3,
        teamB: 2,
        resultType: "tie",
        winner: null
      },
      {
        draw: "early",
        time: "7:00 PM",
        sheet: 3,
        teamA: 12,
        teamB: 5,
        resultType: "win",
        winner: 12
      },
      {
        draw: "late",
        time: "9:15 PM",
        sheet: 1,
        teamA: 10,
        teamB: 11,
        resultType: "win",
        winner: 11
      },
      {
        draw: "late",
        time: "9:15 PM",
        sheet: 2,
        teamA: 1,
        teamB: 7,
        resultType: "win",
        winner: 7
      },
      {
        draw: "late",
        time: "9:15 PM",
        sheet: 3,
        teamA: 8,
        teamB: 6,
        resultType: "win",
        winner: 6
      }
    ],

    teamNortham: {
      opponent: 1,
      result: "W",
      teamScore: 7,
      opponentScore: 4,
      ends: 7,
      draw: "late",
      time: "9:15 PM",
      sheet: 2,
      rockColor: "Red",
      lineup: [
        "Richard",
        "Liam",
        "Tom",
        "Mike"
      ],
      notes: "Dallas, Jason and Jeff unavailable. Richard and Liam spared."
    }
  }
];