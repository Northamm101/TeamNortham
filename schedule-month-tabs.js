function setActiveMonthTab(selectedTab) {
  const monthTabs = document.querySelectorAll(
    ".schedule-month-tab, .month-button"
  );

  monthTabs.forEach((tab) => {
    tab.classList.remove("active");
    tab.removeAttribute("aria-current");
  });

  selectedTab.classList.add("active");
  selectedTab.setAttribute("aria-current", "true");
}

function initializeScheduleMonthTabs() {
  const monthTabs = document.querySelectorAll(
    ".schedule-month-tab, .month-button"
  );

  monthTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setActiveMonthTab(tab);
    });
  });
}

initializeScheduleMonthTabs();
