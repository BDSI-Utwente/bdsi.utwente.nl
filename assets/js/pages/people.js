const token =
  "c2VjcmV0LXRva2VuOjcwNWE0OTQyNGE3OTRiNTM1Mzc2MzE2YzQ2NGI1OTYzNzI3NTcwNzc1NjUx";
const localStorageKey = "bdsi.people";
const localStorageKeyVersion = 2;

/**
 * Call the UTwente people API to attempt to resolve non-BDSi people mentioned in projects, workshops, etc.
 *
 * @param {string} name search query for the people API
 * @returns {{ found: number, data: any[]}}
 */
const resolve = async (name) => {
  // try resolve from browser storage
  let person = localStorage.getItem(
    `${localStorageKey}.v${localStorageKeyVersion}.${name}`
  );
  if (person) {
    person = JSON.parse(person);
    console.debug({ name, data: person }, "resolved from cache");
    return person;
  }

  // try resolve from people API
  const response = await fetch(
    `https://people.utwente.nl/peoplepagesopenapi/contacts?authorization=${atob(
      token
    )}&query=${name}`
  );
  data = await response.json();
  if (data.found) {
    // console.log({name, data});

    // consider first result only
    person = data.data[0];
    // console.log({person})

    // check for at least a partial match
    if (
      stringSimilarity(
        name,
        person.givenName + " " + person.displayName.split(",", 1).join("")
      ) >= 0.5
    ) {
      localStorage.setItem(
        `${localStorageKey}.v${localStorageKeyVersion}.${name}`,
        JSON.stringify(person)
      );
      console.debug({ name, person }, "resolved from people API");
      return person;
    }
  }

  // we failed...
  console.debug({ name, person, data }, "could not be resolved");
};

/**
 * Find all unresolved people mentioned on the page and call {resolve} on each.
 */
const resolveAll = async () => {
  /**
   * @type {IterableIterator<HTMLDivElement>}
   * */
  const people = document
    .querySelectorAll(".author-list-item.unresolved")
    .values();
  for (const personElement of people) {
    const person = await resolve(personElement.dataset["name"]);
    if (person) {
      hydrate(person, personElement);
    }
  }
};

/**
 * Hydrate an unresolved people mention with additional information as available:
 *
 * - link to people page
 * - avatar image
 *
 * @param {{profileUrl: string, pictureUrl: string}} person person data returned from {resolve}
 * @param {HTMLDivElement} element html div element to hydrate
 */
const hydrate = (person, element) => {
  // create anchor tag
  const anchor = document.createElement("a");
  anchor.href = person.profileUrl;
  anchor.target = "_blank";
  anchor.classList.add("author-list-item", "external");
  element.classList.remove("author-list-item", "unresolved");

  // insert anchor tag after the original element, then append (move) the element into anchor
  element.after(anchor);
  anchor.append(element);

  // create and insert profile image
  if (person.pictureUrl) {
    const image = document.createElement("img");
    image.src = person.pictureUrl;
    image.alt = "";

    element.prepend(image);
  }
};

/**
 * Calculate similarity between two strings
 *
 * Copied from https://github.com/stephenjjbrown/string-similarity-js.
 * @license MIT
 * @param {string} str1 First string to match
 * @param {string} str2 Second string to match
 * @param {number} [substringLength=2] Optional. Length of substring to be used in calculating similarity. Default 2.
 * @param {boolean} [caseSensitive=false] Optional. Whether you want to consider case in string matching. Default false;
 * @returns Number between 0 and 1, with 0 being a low match score.
 */
var stringSimilarity = function (str1, str2, substringLength, caseSensitive) {
  if (substringLength === void 0) {
    substringLength = 2;
  }
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (!caseSensitive) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
  }
  if (str1.length < substringLength || str2.length < substringLength) return 0;
  var map = new Map();
  for (var i = 0; i < str1.length - (substringLength - 1); i++) {
    var substr1 = str1.substr(i, substringLength);
    map.set(substr1, map.has(substr1) ? map.get(substr1) + 1 : 1);
  }
  var match = 0;
  for (var j = 0; j < str2.length - (substringLength - 1); j++) {
    var substr2 = str2.substr(j, substringLength);
    var count = map.has(substr2) ? map.get(substr2) : 0;
    if (count > 0) {
      map.set(substr2, count - 1);
      match++;
    }
  }
  return (match * 2) / (str1.length + str2.length - (substringLength - 1) * 2);
};

resolveAll();
