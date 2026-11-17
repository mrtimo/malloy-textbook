/*
 * Copyright 2023 Google LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

Array.from(document.getElementsByClassName("result-outer")).forEach(
  (resultElement) => {
    const controlElements = Array.from(
      resultElement.getElementsByClassName("result-control")
    );
    const resultElements = Array.from(
      resultElement.getElementsByClassName("result-middle")
    );
    controlElements.forEach((controlElement) => {
      controlElement.addEventListener("click", () => {
        controlElements.forEach((controlElement) =>
          controlElement.removeAttribute("selected")
        );
        resultElements.forEach((resultElement) =>
          resultElement.removeAttribute("selected")
        );
        const resultKind = controlElement.getAttribute("data-result-kind");
        controlElement.setAttribute("selected", true);
        const selectedResult = resultElement.querySelector(
          `.result-middle[data-result-kind="${resultKind}"]`
        );
        selectedResult.setAttribute("selected", true);
      });
    });
  }
);

// "Link to this query": update the address bar and copy the full link.
Array.from(document.querySelectorAll("a.result-link")).forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const id = link.getAttribute("href").slice(1);
    const url = location.href.split("#")[0] + "#" + id;
    history.replaceState(null, "", "#" + id);
    highlightLinkedQuery();
    const done = () => {
      const label = link.textContent;
      link.textContent = "✓ Link copied";
      link.classList.add("copied");
      setTimeout(() => {
        link.textContent = label;
        link.classList.remove("copied");
      }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done, done);
    } else {
      done();
    }
  });
});

// Outline the query a link points to, so readers can see where they landed.
function highlightLinkedQuery() {
  document
    .querySelectorAll("div.code-wrapper.linked-query")
    .forEach((el) => el.classList.remove("linked-query"));
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id && document.getElementById(id);
  if (target && target.classList.contains("code-wrapper")) {
    target.classList.add("linked-query");
    setTimeout(() => target.classList.remove("linked-query"), 4000);
  }
}
window.addEventListener("hashchange", highlightLinkedQuery);
if (location.hash) {
  // Results render after load and change the page height, so re-scroll once
  // they have drawn.
  setTimeout(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = document.getElementById(id);
    if (target && target.classList.contains("code-wrapper")) {
      target.scrollIntoView();
      highlightLinkedQuery();
    }
  }, 600);
}
