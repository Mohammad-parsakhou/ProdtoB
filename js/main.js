// Mobile menu, footer year, and the contact form (opens WhatsApp with the message filled in).
(function () {
  var FA = document.documentElement.lang === "fa";
  var T = FA ? {
    missing: "لطفاً نام و چند خط درباره ایده‌تان بنویسید.",
    sent: "واتس‌اپ باید با پیام شما باز شده باشد. اگر باز نشد، به شماره ‎+98 912 065 0593‎ پیام دهید.",
    hello: "سلام، من ", from: " از ", need: "\nنیاز من: "
  } : {
    missing: "Please add your name and a few lines about your idea.",
    sent: "WhatsApp should open with your message. If it didn't, message us at +1 (416) 857-5367.",
    hello: "Hi ProdtoB, I'm ", from: " from ", need: ".\nI need: "
  };

  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var year = document.getElementById("year");
  if (year) {
    try {
      year.textContent = FA ? new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(new Date()) : new Date().getFullYear();
    } catch (e) {}
  }

  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name, msg = form.elements.message, ok = true;
    [name, msg].forEach(function (el) {
      var bad = !el.value.trim();
      el.setAttribute("aria-invalid", bad ? "true" : "false");
      if (bad) ok = false;
    });
    if (!ok) {
      note.textContent = T.missing;
      (name.value.trim() ? msg : name).focus();
      return;
    }
    var company = form.elements.company.value.trim();
    var text = T.hello + name.value.trim() + (company ? T.from + company : "") +
      T.need + form.elements.need.value + "\n\n" + msg.value.trim();
    var url = "https://wa.me/" + (form.getAttribute("data-whatsapp") || "14168575367") + "?text=" + encodeURIComponent(text);
    var a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener";
    document.body.appendChild(a); a.click(); a.remove();
    note.textContent = T.sent;
  });
})();
