function addFileInfoToLinks() {
  const commonFormats = ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf"];
  const links = document.querySelectorAll("a");

  links.forEach((link) => {
    //early opt-out
    if (link.dataset["fileinfoParsed"]) return;

    const url = link.href;
    const extension = url.split(".").pop().toLowerCase();

    if (commonFormats.includes(extension)) {
      fetch(url, { method: "HEAD" })
        .then((response) => response.headers.get("content-length"))
        .catch((_) => false)
        .then((fileSize) => {
          let label = extension.toLocaleUpperCase();
          if (fileSize) {
            label += `, ${humanReadableFileSize(fileSize)}`;
          }

          //   late opt-out
          if (link.dataset["fileinfoParsed"]) return;
          if (!link.ariaLabel) {
            link.ariaLabel = `open or download ${extension} document: ${link.innerText}`;
          }
          link.innerText += ` (${label})`;

          // mark parsed for opt-out
          link.dataset["fileinfoParsed"] = true;
        });
    }
  });
}

function humanReadableFileSize(size) {
  let i = Math.floor(Math.log(size) / Math.log(1024));
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  //   if (i > 0 && size / Math.pow(1024, i) > 100) i++;
  i = Math.min(i, sizes.length - 1);
  return (size / Math.pow(1024, i)).toFixed(i > 1 ? 1 : 0) + sizes[i];
}

document.addEventListener("DOMContentLoaded", addFileInfoToLinks);
document.addEventListener("readystatechange", addFileInfoToLinks);
