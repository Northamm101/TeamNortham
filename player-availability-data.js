const playerAvailability = [
  /*
    Add one object only when there is at least one
    availability issue for a game.

    Example:

    {
      date: "2026-10-01",
      displayDate: "October 1",

      unavailable: [
        "Mike"
      ],

      availableIfNeeded: [
        "Dallas"
      ],

      lastResort: [
        "Jeff"
      ]
    }

    Status meanings:

    unavailable
      Player cannot play.

    availableIfNeeded
      Player is available if the team is short players.

    lastResort
      Player should only be contacted if absolutely necessary.

    If everyone is available for a game,
    do not add an object.

    Delete the object once the game has been played.
  */
];
