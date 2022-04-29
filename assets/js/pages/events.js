const upcoming = document.querySelector("#upcoming");
const completed = document.querySelector("#completed");
const events = document.querySelectorAll(".event");

dayjs.extend(dayjs_plugin_advancedFormat);
const now = new dayjs();
let anyUpcoming = false;

for (const event of [...events].sort(compareEvents)) {
    handleEvent(event);
}

if (!anyUpcoming) {
    upcoming.style.display = "none";
}

// check if event has start and end date data attributes, and if so, check if the event is in the past or future, then append the element to the upcoming or completed div depending.
/**
 *
 * @param {HTMLDivElement} event
 */
function handleEvent(event) {
    const start = event.dataset["start"];
    const end = event.dataset["end"];
    const time = event.dataset["time"];
    const draft = event.dataset["path"].includes("/draft/");

    if (draft) {
        event.remove();
        return;
    }

    event.querySelector(".date").innerHTML = formatDates(start, end, time);

    if (isFuture(end) || isFuture(start)) {
        upcoming.appendChild(event);
        anyUpcoming = true;
    } else if (start || end) {
        completed.appendChild(event);
    }
}

function compareEvents(a, b) {
    const startA = a.dataset["start"];
    const startB = b.dataset["start"];
    const future = isFuture(startA) && isFuture(startB) ? -1 : 1;

    if (startA && startB) {
        if (isToBeAnnounced(startA) != isToBeAnnounced(startB)) {
            return isToBeAnnounced(startA) ? 1 : -1;
        }
        return future * (dayjs(startA).isBefore(dayjs(startB)) ? 1 : -1);
    }
    if (startA || startB) {
        return startA ? -1 : 1;
    }
    return a.dataset["title"].localeCompare(b.dataset["title"]);
}

function isFuture(date) {
    return isToBeAnnounced(date) || (date && dayjs(date).isAfter(now, "day"));
}

function isToBeAnnounced(date) {
    return date && date.match(/(to be announced)|(\wtba\w)/im);
}

/**
 * Format date to be displayed in the event card
 *
 * @param {string?} start
 * @param {string?} end
 * @param {string?} time
 */
function formatDates(start, end, time) {
    if (!start) {
        return "";
    }

    let _start, _end;
    if (start) {
        _start = dayjs(start);
    }
    if (end) {
        _end = dayjs(end);
    }

    if (!_start.isValid()) {
        return start;
    }

    let same_month = _start.isSame(_end, "month");
    let same_year = _start.isSame(_end, "year");
    let this_year = _start.isSame(now, "year");

    let f_start = "",
        f_end = "";

    if (!this_year && (!_end || !_end.isValid() || !same_year)) {
        // if the event is next year, and the end date is in a different year, or there is no end date, use "month day, year"
        f_start = _start.format("MMMM Do, YYYY");
    } else {
        // if the event is this year, use "month day"
        f_start = _start.format("MMMM Do");
    }

    if (_end && _end.isValid() && (!same_year || !this_year)) {
        // if event starts next year, or ends in a different year from the start date, use "month day[, year] - month day, year"
        f_end = _end.format(" – MMMM Do, YYYY");
    } else if (_end && _end.isValid() && !same_month) {
        // if event ends in a different month from the start date, use "month day  – month day"
        f_end = _end.format(" – MMMM Do");
    } else if (_end && _end.isValid() && same_month) {
        // if event ends in the same month as the start date, use "month day  – day"
        f_end = _end.format(" – Do");
    } else if (_end && !_end.isValid()) {
        // if event end is not a valid date (i.e. "to be announced"), use "month day[, year]  – (raw end date)"
        f_end = " – " + end;
    }

    let date = addSuperscriptOrdinals(f_start + f_end);
    if (time) {
        date += `, ${time}`;
    }
    return date;
}

/**
 *
 * @param {@class String} text input string
 * @returns input with ordinal suffixes encapulated in <sup> tags
 */
function addSuperscriptOrdinals(text) {
    return text.replace(/\b(\d+)(st|nd|rd|th)\b/g, (match, p1, p2) => {
        return `${p1}<sup style="text-transform: none;">${p2}</sup>`;
    });
}
