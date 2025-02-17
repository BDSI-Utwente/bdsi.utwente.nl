/**
 * Generate a Table of Contents.
 *
 * @param {string} target css identifier for the HTML element that will be populated with the ToC
 * @param {string} content css identifier for the HTML element that contains the content from which to generate a ToC
 */
function create_toc(
  target = ".content-with-toc .toc",
  content = ".content-with-toc .content"
) {
  const toc_element = document.querySelector(target);
  const content_element = document.querySelector(content);

  // this script is called on all pages at the moment, provide an early out
  if (!toc_element || !content_element) {
    console.debug("no ToC requested, stopping...");
    return;
  }

  // get h2 and h3 level elements to create headers
  /** @type {NodeListOf<HTMLHeadingElement>} */
  const header_elements = content_element.querySelectorAll("h2, h3");

  // another out if there is no point for a ToC (no headers)
  if (header_elements.length <= 2) {
    console.debug("two or fewer headers for ToC, stopping...");

    // give parent container class
    const parent = content_element.parentElement;
    parent.classList.remove("content-with-toc");
    parent.classList.add("container");

    // move content to parent
    parent.append(...content_element.children);

    // remove toc elements to clear our tracks
    toc_element.remove();
    content_element.remove();
    return;
  }

  // clear out previous ToC, if any
  for (const entry of toc_element.children) {
    toc_element.removeChild(entry);
    entry.remove();
  }

  // apply a11y hints to ToC element
  toc_element.role = "navigation";
  toc_element.ariaLabel = "Table of contents";

  // create ToC header, if not existing
  let toc_header_element = toc_element.querySelector("h2.toc-header");
  if (!toc_header_element) {
    console.log({ toc_header_element });

    toc_header_element = document.createElement("h2");
    toc_header_element.classList.add("toc-header", "h6");
    toc_header_element.innerText = "On this page";
    toc_element.append(toc_header_element);
  }

  // create ToC main list
  const toc_list_element = document.createElement("ul");
  toc_list_element.classList.add("toc-list");
  toc_element.append(toc_list_element);

  // keep a list of toc entries around
  /** @type {HTMLLIElement[]} */
  const toc_entries = [];

  // set up intersection observer to highlight current position
  const observer = new IntersectionObserver(
    (header_updates) => {
      // go over entries and mark toc_entries (not) visible
      for (const update of header_updates) {
        const entry = toc_entries.find(
          (e) => e.dataset["target"] == update.target.id
        );
        if (entry) {
          entry.dataset["visible"] = update.isIntersecting;
        }
      }

      // loop over toc entries, set first visible highlighted
      // note that it is possible for long sections to not have any headings
      // visible, if this is the case we don't want to make any changes in
      // highlights.
      let highlight;
      for (const entry of Object.values(toc_entries)) {
        if (entry.dataset["visible"] == "true") {
          entry.classList.add("current");
          highlight = entry;
          break;
        }
      }

      // if we set a highlight, turn it off for all other entries
      if (highlight) {
        for (const entry of Object.values(toc_entries)) {
          if (entry == highlight) {
            continue;
          }
          entry.classList.remove("current");
        }
      }
    },
    { threshold: [0, 1] }
  );

  // generate toc
  for (const header_element of header_elements) {
    // skip opt-out headers (data-toc-skip)
    if (
      get_parent_elements(header_element).some(
        (element) => element.dataset["tocSkip"] !== undefined
      )
    ) {
      continue;
    }

    ensure_id(header_element);
    toc_entries.push(create_toc_entry(header_element, toc_list_element));
    observer.observe(header_element);
  }
}

/**
 * Recursively get a list of element and all it's parent elements.
 *
 * adapted from  https://stackoverflow.com/a/8729274 and Copilot AI.
 *
 * @param {HTMLElement} element target element
 * @returns List of all parent elements, including the target itself
 */
function get_parent_elements(element) {
  let elements = [];

  while (element) {
    elements.push(element);
    element = element.parentElement;
  }

  return elements;
}

/**
 * Ensure the heading element has an ID assigned.
 *
 * If an id was not already assigned, generates a new unique id based on innerText
 *
 * @param {HTMLHeadingElement} target Heading element to assign id to
 */
function ensure_id(target) {
  if (!target.id) {
    let slab = target.innerText.toLowerCase().replace(/[^a-z0-9-_]/g, "-");
    let candidate_id = slab;
    let i = 0;
    while (document.querySelector(`#${candidate_id}`)) {
      candidate_id = `${slab}-${++i}`;
    }

    target.id = candidate_id;
  }
}

/**
 * Create a list element and append to the ToC
 *
 * @param {HTMLHeadingElement} heading heading element
 * @param {HTMLUListElement} toc ToC list element
 * @returns {HTMLLIElement} appended <li> element
 */
function create_toc_entry(heading, toc) {
  const toc_li_element = document.createElement("li");
  toc_li_element.classList.add(
    "toc-entry",
    `toc-level-${heading.nodeName.toLowerCase()}`
  );
  toc_li_element.dataset["target"] = heading.id;

  const toc_a_element = document.createElement("a");
  toc_a_element.innerText = heading.textContent.trim();
  toc_a_element.href = `#${heading.id}`;
  // toc_a_element.title = heading.textContent.trim()

  toc_li_element.append(toc_a_element);
  toc.append(toc_li_element);

  return toc_li_element;
}

document.addEventListener("DOMContentLoaded", () => create_toc());
document.addEventListener("readystatechange", () => create_toc());
