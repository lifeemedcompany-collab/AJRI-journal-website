/* ============================================================
   AJRI Journal — shared masthead + footer injection, behavior
   ============================================================ */
(function () {
  var NAV_LINKS = [
    { label: "Home", href: "index.html" },
    { label: "About AJRI", href: "about.html" },
    { label: "Editorial Board", href: "editorial-board.html" },
    { label: "Aims & Scope", href: "aims-scope.html" },
    { label: "Peer Review", href: "peer-review.html" },
    { label: "Policies", href: "policies.html" },
    { label: "Author Guidelines", href: "author-guidelines.html" },
    { label: "Current Issue", href: "current-issue.html" },
    { label: "Archives", href: "archives.html" },
    { label: "Contact", href: "contact.html" }
  ];

  var page = (location.pathname.split("/").pop() || "index.html");
  if (page === "") page = "index.html";

  function linkHtml(l) {
    var active = l.href === page ? ' class="active"' : "";
    return '<a' + active + ' href="' + l.href + '">' + l.label + "</a>";
  }

  var logoSvg =
    '<img src="assets/logo.png" alt="AJRI logo" loading="eager" />';

  /* ---------- MASTHEAD ---------- */
  var navHtml =
    '<header class="jnav" id="siteNav">' +
      '<div class="jnav__shell">' +
        '<div class="jnav__top">' +
          '<a class="brand" href="index.html"><span class="brand__mark">' + logoSvg + '</span>' +
            '<span class="brand__name"><b>AJRI</b></span></a>' +
          '<ul class="jnav__links">' +
            NAV_LINKS.map(function (l) { return "<li>" + linkHtml(l) + "</li>"; }).join("") +
          "</ul>" +
          '<a class="jnav__submit" href="submit-manuscript.html">Submit Manuscript</a>' +
          '<button class="jnav__burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
        "</div>" +
      "</div>" +
    "</header>" +
    '<div class="jnav__drawer" id="drawer"><ul>' +
      NAV_LINKS.map(function (l) { return "<li>" + linkHtml(l) + "</li>"; }).join("") +
      '<a class="btn btn--gold" href="submit-manuscript.html">Submit Manuscript</a>' +
    "</ul></div>";

  /* ---------- FOOTER ---------- */
  var footerHtml =
    '<footer class="footer"><div class="container">' +
      '<div class="footer__top">' +
        '<div class="footer__brand">' +
          '<a class="brand" href="index.html"><span class="brand__mark">' + logoSvg + '</span>' +
            '<span class="brand__name"><b>AJRI</b><span>American Journal of Research &amp; Innovation</span></span></a>' +
          "<p>An international, multidisciplinary, peer-reviewed, open-access journal published by Lifeline Emed Companies LLC.</p>" +
          '<div class="contacts">' +
            '<a href="mailto:info@lifelineemed.com">info@lifelineemed.com</a>' +
            '<span>342 Sip Ave, Bsmt,<br>Jersey City, New Jersey 07306</span>' +
          "</div>" +
        "</div>" +
        '<div><h4>Journal</h4><ul>' +
          '<li><a href="about.html">About AJRI</a></li>' +
          '<li><a href="editorial-board.html">Editorial Board</a></li>' +
          '<li><a href="aims-scope.html">Aims &amp; Scope</a></li>' +
          '<li><a href="current-issue.html">Current Issue</a></li>' +
          '<li><a href="archives.html">Archives</a></li>' +
        "</ul></div>" +
        '<div><h4>For Authors</h4><ul>' +
          '<li><a href="author-guidelines.html">Author Guidelines</a></li>' +
          '<li><a href="peer-review.html">Peer Review Process</a></li>' +
          '<li><a href="publication-ethics.html">Publication Ethics</a></li>' +
          '<li><a href="policies.html">Policies</a></li>' +
          '<li><a href="submit-manuscript.html">Submit Manuscript</a></li>' +
        "</ul></div>" +
        '<div><h4>Publisher</h4><ul>' +
          '<li><a href="https://lifelineemed.com/" target="_blank" rel="noopener">Lifeline Emed Companies</a></li>' +
          '<li><a href="https://lifelineemed.com/conferences.html" target="_blank" rel="noopener">Conferences</a></li>' +
          '<li><a href="https://lifelineemed.com/publications.html" target="_blank" rel="noopener">Publications</a></li>' +
          '<li><a href="contact.html">Contact the Journal</a></li>' +
        "</ul></div>" +
      "</div>" +
      '<div class="footer__bottom">' +
        "<p>© 2026 American Journal of Research &amp; Innovation (AJRI) · Published by Lifeline Emed Companies LLC.</p>" +
        '<span class="tagline">ISSN 3144-1726 · DOI Registration Planned · Open Access</span>' +
      "</div>" +
    "</div></footer>";

  var navMount = document.getElementById("site-nav");
  var footMount = document.getElementById("site-footer");
  if (navMount) navMount.outerHTML = navHtml;
  if (footMount) footMount.outerHTML = footerHtml;

  /* ---------- Behavior ---------- */
  var nav = document.getElementById("siteNav");

  var progress = document.createElement("div");
  progress.className = "scroll-progress";
  document.body.appendChild(progress);

  /* fixed full-page hero background — content scrolls over it.
     Pages declare their image via <body data-fixed-bg="assets/heroes/<img>.jpg">. */
  var fixedSrc = document.body.getAttribute("data-fixed-bg");
  if (fixedSrc) {
    document.body.classList.add("has-hero");
    var fixedBg = document.createElement("div");
    fixedBg.className = "hero-fixed-bg";
    fixedBg.style.backgroundImage = "url('" + fixedSrc + "')";
    document.body.insertBefore(fixedBg, document.body.firstChild);
  }

  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 12);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var burger = document.getElementById("burger");
  var drawer = document.getElementById("drawer");
  if (burger && drawer) {
    burger.addEventListener("click", function () {
      var open = drawer.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    drawer.addEventListener("click", function (e) {
      if (e.target.tagName === "A") drawer.classList.remove("open");
    });
  }

  /* reveal on scroll (with stagger inside groups) */
  document.querySelectorAll(".grid, .steps, .stats, .article-list, .checklist").forEach(function (group) {
    var items = group.querySelectorAll(".reveal");
    items.forEach(function (it, i) { it.style.transitionDelay = (i % 6) * 80 + "ms"; });
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* demo form handlers */
  document.querySelectorAll("form[data-demo]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = f.querySelector("[data-msg]");
      if (msg) { msg.style.display = "block"; }
      f.reset();
    });
  });
})();
