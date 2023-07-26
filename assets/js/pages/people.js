

/**
 * Call the UTwente people API to attempt to resolve non-BDSi people mentioned in projects, workshops, etc.
 * 
 * @param {string} name search query for the people API
 * @returns {{ found: number, data: any[]}}
 */
const resolve = async name => {
    let data = localStorage.getItem(`bdsi.people.${name}`);
    if (data) {
        data = JSON.parse(data);
        console.log({ name, data }, "resolved from cache");
    } else {
        const response = await fetch(`https://people.utwente.nl/peoplepagesopenapi/contacts?query=${name}`);
        data = await response.json();
        if (data.found) {
            localStorage.setItem(`bdsi.people.${name}`, JSON.stringify(data));
            console.log({ name, data }, "resolved from people API");
        } else {
            console.log({ name }, "could not be resolved")
        }
    }

    return data;
}

/**
 * Find all unresolved people mentioned on the page and call {resolve} on each.
 */
const resolveAll = async () => {
    /** 
    * @type {IterableIterator<HTMLDivElement>} 
    * */
    const people = document.querySelectorAll(".author-list-item.unresolved").values();
    for (const person of people) {
        const data = await resolve(person.dataset["name"])
        if (data.found) {
            hydrate(data.data[0], person)
        }
    }
}

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
    anchor.classList.add("author-list-item", "external")
    element.classList.remove("author-list-item", "unresolved")

    // insert anchor tag after the original element, then append (move) the element into anchor
    element.after(anchor);
    anchor.append(element);

    // create and insert profile image
    const image = document.createElement("img");
    image.src = person.pictureUrl;
    image.alt = person.displayName;

    element.prepend(image)
}

resolveAll()