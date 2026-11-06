/* Portfolio page script: typing text, nav, mobile menu, filters,
   scroll reveal, number counters, copy email. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----- Typing effect in the hero. Change the words here. ----- */
  var words = ["AI Video Editor", "AI Ad Creator", "AI UGC Creator", "AI Video Editor"];
  var typed = document.getElementById("typed");
  if (typed && !reduce) {
    var w = 0, i = words[0].length, deleting = true;
    (function tick() {
      var word = words[w];
      typed.textContent = word.slice(0, i);
      var delay = deleting ? 45 : 90;
      if (deleting) {
        i--;
        if (i < 0) { deleting = false; w = (w + 1) % words.length; i = 0; delay = 300; }
      } else {
        i++;
        if (i > words[w].length) { deleting = true; i = words[w].length; delay = 1800; }
      }
      setTimeout(tick, delay);
    })();
  }

  /* ----- Nav gets a background after scrolling ----- */
  var nav = document.getElementById("nav");
  function onScroll() { nav.classList.toggle("is-solid", window.scrollY > 20); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----- Mobile menu ----- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { menu.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }
  });

  /* ----- Portfolio filters ----- */
  var filters = document.querySelectorAll(".filter");
  var works = document.querySelectorAll(".work");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filters.forEach(function (b) { b.classList.remove("is-on"); });
      btn.classList.add("is-on");
      var f = btn.getAttribute("data-f");
      works.forEach(function (work) {
        work.classList.toggle("is-hidden", f !== "all" && work.getAttribute("data-cat") !== f);
      });
    });
  });

  /* ----- Number counters ----- */
  function count(el) {
    var target = +el.getAttribute("data-count");
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = target + suffix; return; }
    var start = null, dur = 1400;
    (function step(t) {
      if (!start) start = t;
      var p = Math.min(1, (t - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }

  /* ----- Reveal on scroll ----- */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        e.target.querySelectorAll("[data-count]").forEach(count);
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
    document.querySelectorAll("[data-count]").forEach(count);
  }

  /* ----- Copy email ----- */
  var copyBtn = document.getElementById("copy");
  var emailEl = document.getElementById("email");
  copyBtn.addEventListener("click", function () {
    function selectIt() {
      var r = document.createRange(); r.selectNodeContents(emailEl);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      copyBtn.textContent = "Press Ctrl+C";
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailEl.textContent).then(function () { copyBtn.textContent = "Copied!"; }, selectIt);
    } else { selectIt(); }
    setTimeout(function () { copyBtn.textContent = "Copy Email"; }, 2000);
  });

  /* ----- Tool logos: try each source in order, hide if none load ----- */
  document.querySelectorAll(".badge img[data-icons]").forEach(function (img) {
    var list = img.getAttribute("data-icons").split("|");
    var n = 0;
    function next() {
      if (n >= list.length) { img.remove(); return; }
      var src = list[n++];
      img.classList.toggle("is-white", src.charAt(0) === "!");
      img.src = src.replace(/^!/, "");
    }
    img.addEventListener("error", next);
    img.addEventListener("load", function () {
      img.parentNode.classList.add("has-logo");
      img.parentNode.title = img.parentNode.textContent.trim();
    });
    next();
  });

  /* ----- Videos: thumbnails + popup player ----- */
  function youtubeId(url) {
    var m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : null;
  }
  function driveId(url) {
    var m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
    return m ? m[1] : null;
  }
  var player = document.getElementById("player");
  var box = document.getElementById("player-box");
  var closeBtn = document.getElementById("player-close");
  var lastCard = null;

  function openPlayer(src, tall, card) {
    var yt = youtubeId(src), dr = driveId(src);
    box.innerHTML = "";
    box.classList.toggle("is-tall", !!tall);
    if (yt) {
      box.innerHTML = '<iframe src="https://www.youtube.com/embed/' + yt + '?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="Video"></iframe>';
    } else if (dr) {
      box.innerHTML = '<iframe src="https://drive.google.com/file/d/' + dr + '/preview" allow="autoplay; fullscreen" allowfullscreen title="Video"></iframe>';
    } else {
      var v = document.createElement("video");
      v.src = src; v.controls = true; v.autoplay = true; v.playsInline = true;
      box.appendChild(v);
    }
    lastCard = card;
    player.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }
  function closePlayer() {
    player.hidden = true;
    box.innerHTML = "";
    document.body.style.overflow = "";
    if (lastCard) lastCard.focus();
  }
  closeBtn.addEventListener("click", closePlayer);
  player.addEventListener("click", function (e) { if (e.target === player) closePlayer(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !player.hidden) closePlayer(); });

  document.querySelectorAll(".work[data-src]").forEach(function (card) {
    var src = (card.getAttribute("data-src") || "").trim();
    if (!src) return;                      /* no video yet: card stays as is */
    var tall = card.getAttribute("data-ratio") === "9:16";
    var thumb = card.querySelector("span.thumb");
    var yt = youtubeId(src);
    if (thumb && yt) {
      thumb.classList.add("thumb--yt");
      thumb.style.background = "#111 url(https://img.youtube.com/vi/" + yt + "/hqdefault.jpg)";
    } else if (thumb && driveId(src)) {
      /* Google Drive: use Drive's own preview image as the thumbnail */
      thumb.classList.add("thumb--yt");
      thumb.style.background = "#111 url(https://drive.google.com/thumbnail?id=" + driveId(src) + "&sz=w800)";
    } else if (thumb) {
      /* local mp4: show the video itself as the thumbnail, play on hover */
      var pv = document.createElement("video");
      pv.className = "thumb";
      pv.src = src + "#t=0.5";
      pv.muted = true; pv.playsInline = true; pv.preload = "metadata"; pv.loop = true;
      thumb.replaceWith(pv);
      if (!reduce) {
        card.addEventListener("mouseenter", function () { pv.play().catch(function () {}); });
        card.addEventListener("mouseleave", function () { pv.pause(); });
      }
    }
    card.addEventListener("click", function (e) { e.preventDefault(); openPlayer(src, tall, card); });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
