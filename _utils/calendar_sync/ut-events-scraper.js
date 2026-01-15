const fs = require("fs/promises");
const yaml = require("yaml");
const { parse } = require("node-html-parser");
const { decode } = require("html-entities");

const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const path = require("path");

const TIMEZONE = "Europe/Amsterdam";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.tz.setDefault(TIMEZONE);

async function getEvents(url, source, out) {
  const response = await fetch(url, {
    headers: { "content-encoding": "utf8" },
  });
  const body = await response.text();

  const root = parse(body);
  let events = root
    .querySelectorAll("li.summary__introblock, .summary__item")
    .map(async (li) => {
      const event_url = li.querySelector("a.summary__link").attributes["href"];
      const img_url = new URL(
        li.querySelector("img.summary__image").attributes["src"],
        "https://utwente.nl/"
      );
      const title = li.querySelector(".summary__title").innerText.trim();
      const description = li
        .querySelector(".summary__description")
        ?.innerText.trim();
      // const date = li.querySelector(".summary__date, .summary__meta .date")?.innerText.trim();
      const [startDate, endDate, _description] = await getEventTimes(event_url);

      return {
        title: decode(title),
        description: decode(description ?? _description),
        source,
        url: event_url,
        img_url: img_url.href,
        // date,
        start: startDate,
        end: endDate,
      };
    });
  let evaluated_events = await Promise.all(events);

  // convert date/time to be equivalent to events
  for (const event of evaluated_events) {
    event.date = event.start.format("YYYY-MM-DD");
    event.endDate = event.end.format("YYYY-MM-DD");

    if (event.end.isBefore(event.start.add(1, "day"))) {
      event.time =
        event.start.format("HH:mm") + " - " + event.end.format("HH:mm");
    }

    event.start = event.start.format();
    event.end = event.end.format();
  }

  // filter out duplicates
  evaluated_events = evaluated_events.filter(
    (ev, index, events) =>
      index == events.findIndex((other_ev) => ev.title == other_ev.title)
  );

  // write to outfile
  await fs.writeFile(out, yaml.stringify(evaluated_events));
}

async function getEventTimes(url) {
  const response = await fetch(url);
  const body = await response.text();
  const root = parse(body);

  const start = root
    .querySelector("div.addeventatc span.start")
    .innerText.trim();
  const end = root.querySelector("div.addeventatc span.end").innerText.trim();
  const desc =
    root.querySelector(".contentpart__main p")?.innerText.trim() ?? "";

  return [
    dayjs(start, "DD/MM/YYYY HH:mm"),
    dayjs(end, "DD/MM/YYYY HH:mm"),
    desc,
  ];
}

function main() {
  let [, , url, source, out] = process.argv;
  out ??= path.normalize(`./${source}.yaml`);

  if (!url || !source) {
    console.log(`an input url is required. 
        
Usage:
    node bms-lab-events.js <url> <source> [<output>]

Options:
    url        url to events list.
    source     source label applied to events.
    output     path to output file (defaults to: \"./<source>.yaml\")`);
    process.exit(1);
  }
  getEvents(url, source, out);
}

main();
