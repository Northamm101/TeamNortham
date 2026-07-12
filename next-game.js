function getWinnipegDateTimeKey() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Winnipeg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  });

  const parts = formatter.formatToParts(new Date());
  const values = {};

  parts.forEach((part) => {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  });

  return Number(
    `${values.year}${values.month}${values.day}${values.hour}${values.minute}`
  );
}

function getGameStartKey(game) {
  const [year, month, day] = game.date.split("-").map(Number);

  const timeMatch = game.time.match(/(\d+):(\d+)\s(AM|PM)/i);

  if (!timeMatch) {
    return 0;
  }

  let hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);
  const period = timeMatch[3].toUpperCase();

  if (period === "PM" && hour !== 12) {
    hour += 12;
  }

  if (period === "AM" && hour === 12) {
    hour = 0;
  }

  return Number(
    `${year}` +
    `${String(month).padStart(2, "0")}` +
    `${String(day).padStart(2, "0")}` +
    `${String(hour).padStart(2, "0")}` +
    `${String(minute).padStart(2, "0")}`
  );
}

function renderNextGameAvailability(nextGame) {
  const availabilitySection = document.getElementById(
    "next-game-availability"
  );

  const availabilityList = document.getElementById(
    "next-game-availability-list"
  );

  if (!availabilitySection || !availabilityList) {
    return;
  }

  const availabilityEntry =
    typeof playerAvailability !== "undefined"
      ? playerAvailability.find(
          (entry) => entry.date === nextGame.date
        )
      : null;

  if (!availabilityEntry) {
    availabilitySection.hidden = true;
    availabilityList.innerHTML = "";
    return;
  }

  const availabilityLines = [];

  (availabilityEntry.unavailable || []).forEach((player) => {
    availabilityLines.push(
      `<p><strong>${player}</strong> — Unavailable</p>`
    );
  });

  (availabilityEntry.availableIfNeeded || []).forEach((player) => {
    availabilityLines.push(
      `<p><strong>${player}</strong> — Available if Needed</p>`
    );
  });

  (availabilityEntry.lastResort || []).forEach((player) => {
    availabilityLines.push(
      `<p><strong>${player}</strong> — Last Resort</p>`
    );
  });

  (availabilityEntry.spares || []).forEach((player) => {
    availabilityLines.push(
      `<p><strong>${player}</strong> — Spare</p>`
    );
  });

  if (availabilityLines.length === 0) {
    availabilitySection.hidden = true;
    availabilityList.innerHTML = "";
    return;
  }

  availabilityList.innerHTML = availabilityLines.join("");
  availabilitySection.hidden = false;
}

function updateNextGameCard() {
  const currentKey = getWinnipegDateTimeKey();

  const nextGame = teamNorthamSchedule.find(
    (game) => getGameStartKey(game) > currentKey
  );

  const seasonBadge = document.getElementById("next-game-season");
  const dateValue = document.getElementById("next-game-date");
  const timeValue = document.getElementById("next-game-time");
  const sheetValue = document.getElementById("next-game-sheet");
  const opponentValue = document.getElementById("next-game-opponent");
  const availabilitySection = document.getElementById(
    "next-game-availability"
  );

  if (
    !seasonBadge ||
    !dateValue ||
    !timeValue ||
    !sheetValue ||
    !opponentValue
  ) {
    return;
  }

  if (!nextGame) {
    seasonBadge.textContent = "Season Complete";
    dateValue.textContent = "No upcoming games";
    timeValue.textContent = "—";
    sheetValue.textContent = "—";
    opponentValue.textContent = "—";

    if (availabilitySection) {
      availabilitySection.hidden = true;
    }

    return;
  }

  seasonBadge.textContent = nextGame.season;
  dateValue.textContent = nextGame.displayDate;
  timeValue.textContent = nextGame.time;
  sheetValue.textContent = `Sheet ${nextGame.sheet}`;
  opponentValue.textContent = nextGame.opponent;

  renderNextGameAvailability(nextGame);
}

updateNextGameCard();

/*
  Recheck once every minute.

  This allows the card to advance automatically when a scheduled
  Team Northam game begins, even if the app remains open.
*/
setInterval(updateNextGameCard, 60000);
