const ICAL = require("ical.js");
const fs = require("fs/promises");
const yaml = require("yaml");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

const TIMEZONE = "Europe/Amsterdam";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(TIMEZONE);

async function getCalendarData(url, out) {
    const response = await fetch(url);
    const icalData = await response.text();
    const jcalData = ICAL.parse(icalData);
    const comp = new ICAL.Component(jcalData);
    const events = [];
    const now = dayjs();
    const today = now.startOf("day");

    console.log({
        icalData, 
        jcalData: JSON.stringify(jcalData, null, 2),
        now
    })

    for (const vevent of comp.getAllSubcomponents('vevent')) {

        const event = new ICAL.Event(vevent);

        if (event.isRecurring) {
            const iterator = event.iterator();
            let next; // = iterator.next();
            let i = 0;
            while (next = iterator.next()) {
                const _next = dayjs(next.toJSDate())
                
                if (_next.isBefore(today)) {
                    continue;
                }
                if (i++ >= 4) {
                    // don't list more than 4 events of the same type
                    break;
                }
                if (_next.isAfter(today.add(2, "month"))) {
                    // don't list more than two months ahead
                    break;
                }

                if (_next.isAfter(today)) {
                    const occurrence = event.getOccurrenceDetails(next);
                    events.push({ 
                        title: (occurrence.summary ?? event.summary).replace(/^Copy: /, "").trim(), 
                        location: occurrence.location ?? event.location, 
                        start: dayjs(occurrence.startDate.toJSDate()), 
                        end: dayjs(occurrence.endDate.toJSDate()) });
                }
            }
        } else {
            events.push({ 
                title: event.summary.replace(/^Copy: /, "").trim(), 
                location: event.location, 
                start: dayjs(event.startDate.toJSDate()), 
                end: dayjs(event.endDate.toJSDate()) 
            });
        }
    }

    // convert date/time to be equivalent to events
    for (const event of events) {
        event.date = event.start.format("YYYY-MM-DD");
        event.endDate = event.end.format("YYYY-MM-DD");

        if (event.end.isBefore(event.start.add(1, "day"))) {
            event.time = event.start.format("HH:mm") + " - " + event.end.format("HH:mm");
        }

        event.start = event.start.format()
        event.end = event.end.format()
    }

    


    await fs.writeFile(out, yaml.stringify(events));
}

function main() {
    let [,, feed, target] = process.argv;
    target ??= "./calendar.yaml";

    if (!feed) {
        console.log("an input feed is required. \n\nUsage:\n\tnode sync.js <feed> [<output>]\n\nfeed: \t\turl to .ics (iCal) feed.\noutput: \tpath to output file (defaults to: \"./calendar.yaml\")");
        process.exit(1)
    }

    getCalendarData(feed, target);
}

main();