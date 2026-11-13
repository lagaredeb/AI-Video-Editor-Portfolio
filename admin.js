/* Video Manager: add, edit, reorder and remove portfolio videos.
   No login. Changes are kept in this browser as a draft; "Download
   videos.json" gives you the file to upload to your website. */
(function () {
  "use strict";

  /* The styles (must match the filter buttons in index.html) */
  var STYLES = [
    ["claymation", "Claymation"],
    ["lego", "Lego"],
    ["pixar", "Pixar Animation"],
    ["realistic", "Realistic Ads"],
    ["singing", "Singing Ads"]
  ];
  var DRAFT_KEY = "portfolio_videos_draft";

  var videos = [];
  var $ = function (id) { return document.getElementById(id); };
  var list = $("list");

  $("f-cat").innerHTML = STYLES.map(function (s) { return '<option value="' + s[0] + '">' + s[1] + "</option>"; }).join("");

  /* ----- helpers ----- */
  function store(v) { try { v === null ? localStorage.removeItem(DRAFT_KEY) : localStorage.setItem(DRAFT_KEY, v); } catch (e) {} }
  function draft() { try { return localStorage.getItem(DRAFT_KEY); } catch (e) { return null; } }
  function status(el, msg, kind) { el.textContent = msg; el.className = "ad-status" + (kind ? " is-" + kind : ""); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function driveId(url) { var m = String(url).match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([\w-]+)/); return m ? m[1] : null; }
  function youtubeId(url) { var m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/); return m ? m[1] : null; }
  function thumbUrl(link) {
    var d = driveId(link), y = youtubeId(link);
    if (d) return "https://drive.google.com/thumbnail?id=" + d + "&sz=w400";
    if (y) return "https://img.youtube.com/vi/" + y + "/mqdefault.jpg";
    return "";
  }
  function styleName(v) { for (var i = 0; i < STYLES.length; i++) if (STYLES[i][0] === v) return STYLES[i][1]; return v; }
  function json() { return JSON.stringify(videos, null, 2) + "\n"; }

  function changed() {
    store(json());                                   /* autosave the draft */
    $("download").classList.add("ad-dirty");
    $("discard").hidden = false;
    status($("save-status"), "Changes saved in this browser. Download videos.json to publish them.", null);
  }

  /* ----- list ----- */
  function render() {
    $("count").textContent = videos.length;
    if (!videos.length) { list.innerHTML = '<li class="ad-empty">No videos yet. Add one above.</li>'; return; }
    list.innerHTML = videos.map(function (v, i) {
      var t = thumbUrl(v.link);
      return '<li class="ad-item" data-i="' + i + '">' +
        '<a class="ad-thumb" href="' + esc(v.link) + '" target="_blank" rel="noopener" title="Open video"' +
          (t ? ' style="background-image:url(\'' + esc(t) + '\')"' : "") + "></a>" +
        '<div class="ad-info"><input data-k="title" value="' + esc(v.title || "") + '" placeholder="Title" aria-label="Title">' +
          '<span class="ad-link">' + esc(v.link) + "</span></div>" +
        '<select data-k="category" aria-label="Style">' +
          STYLES.map(function (s) { return '<option value="' + s[0] + '"' + (s[0] === v.category ? " selected" : "") + ">" + s[1] + "</option>"; }).join("") +
        "</select>" +
        '<label class="ad-check"><input type="checkbox" data-k="vertical"' + (v.vertical ? " checked" : "") + "> 9:16</label>" +
        '<div class="ad-btns">' +
          '<button class="ad-icon" type="button" data-act="up" aria-label="Move up" title="Move up"' + (i === 0 ? " disabled" : "") + ">&uarr;</button>" +
          '<button class="ad-icon" type="button" data-act="down" aria-label="Move down" title="Move down"' + (i === videos.length - 1 ? " disabled" : "") + ">&darr;</button>" +
          '<button class="ad-icon ad-del" type="button" data-act="del" aria-label="Remove" title="Remove">&times;</button>' +
        "</div></li>";
    }).join("");
  }

  list.addEventListener("input", function (e) {
    var li = e.target.closest(".ad-item"); if (!li || e.target.dataset.k !== "title") return;
    videos[+li.dataset.i].title = e.target.value; changed();
  });
  list.addEventListener("change", function (e) {
    var li = e.target.closest(".ad-item"); if (!li) return;
    var v = videos[+li.dataset.i], k = e.target.dataset.k;
    if (k === "category") v.category = e.target.value;
    else if (k === "vertical") v.vertical = e.target.checked;
    else return;
    changed();
  });
  list.addEventListener("click", function (e) {
    var btn = e.target.closest("button[data-act]"); if (!btn) return;
    var i = +btn.closest(".ad-item").dataset.i, act = btn.dataset.act;
    if (act === "del") {
      if (btn.dataset.sure !== "1") {                 /* click twice to remove */
        btn.dataset.sure = "1"; btn.textContent = "?"; btn.title = "Click again to remove";
        setTimeout(function () { if (btn.isConnected) { btn.dataset.sure = ""; btn.innerHTML = "&times;"; btn.title = "Remove"; } }, 2500);
        return;
      }
      videos.splice(i, 1);
    } else if (act === "up" && i > 0) {
      videos.splice(i - 1, 0, videos.splice(i, 1)[0]);
    } else if (act === "down" && i < videos.length - 1) {
      videos.splice(i + 1, 0, videos.splice(i, 1)[0]);
    }
    render(); changed();
  });

  /* ----- add ----- */
  $("add-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var link = $("f-link").value.trim(), st = $("add-status");
    if (!link) { status(st, "Paste a Google Drive link first.", "err"); return; }
    if (/drive\.google\.com\/drive\/(u\/\d+\/)?folders\//.test(link)) { status(st, "That's a folder link. Open the video, then Share > Copy link.", "err"); return; }
    if (!driveId(link) && !youtubeId(link) && !/\.mp4(\?|$)/i.test(link)) { status(st, "That doesn't look like a video link. Use a link like https://drive.google.com/file/d/.../view", "err"); return; }
    if (videos.some(function (v) { return driveId(v.link) && driveId(v.link) === driveId(link); })) { status(st, "This video is already in the list.", "err"); return; }
    var cat = $("f-cat").value;
    var same = videos.filter(function (v) { return v.category === cat; }).length;
    videos.push({ title: $("f-title").value.trim() || styleName(cat) + " " + (same + 1), category: cat, link: link, vertical: $("f-vertical").checked });
    render(); changed();
    $("f-link").value = ""; $("f-title").value = ""; $("f-vertical").checked = false;
    status(st, "Added.", "ok");
    $("f-link").focus();
  });

  /* ----- download ----- */
  $("download").addEventListener("click", function () {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([json()], { type: "application/json" }));
    a.download = "videos.json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    status($("save-status"), "Downloaded. Replace videos.json in your Portfolio folder, then upload it (Commit and Sync).", "ok");
  });

  /* ----- discard draft ----- */
  $("discard").addEventListener("click", function () {
    var btn = this;
    if (btn.dataset.sure !== "1") {
      btn.dataset.sure = "1"; btn.textContent = "Click again to discard";
      setTimeout(function () { btn.dataset.sure = ""; btn.textContent = "Discard changes"; }, 2500);
      return;
    }
    btn.dataset.sure = ""; btn.textContent = "Discard changes";
    store(null); load();
  });

  /* ----- load: draft first, else the published videos.json ----- */
  function load() {
    var d = draft();
    if (d) {
      try { videos = JSON.parse(d); } catch (e) { videos = []; }
      $("download").classList.add("ad-dirty"); $("discard").hidden = false;
      status($("save-status"), "You have changes that are not published yet. Download videos.json to publish them.", null);
      render(); return;
    }
    fetch("videos.json?v=" + Date.now(), { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
      .then(function (data) { videos = Array.isArray(data) ? data : []; status($("save-status"), "", null); })
      .catch(function () { videos = []; status($("save-status"), "Couldn't read videos.json. Open this page with Live Server or on your website.", "err"); })
      .then(function () {
        $("download").classList.remove("ad-dirty"); $("discard").hidden = true;
        render();
      });
  }

  load();
})();
