/* ==========================================================================
   PMC Website — UI interactions
   Kept intentionally small: navigation, sliders, accordions, form validation.
   ========================================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initFooterYear();
    initNavShadow();
    initNavSearch();
    initHeroSlider();
    initSectorSlider();
    initValuesCarousel();
    initWhatWeDoCarousel();
    initCs2Slider();
    initVideosCarousel();
    initExpertsCarousel();
    initJobsCarousel();
    initTeamCarousel();
    initFormValidation();
    initApplyModal();
  });

  /* Keep the footer copyright year current. */
  function initFooterYear() {
    var el = document.getElementById("pmc-year");
    if (el) {
      el.textContent = String(new Date().getFullYear());
    }
  }

  /* Landing hero carousel — one slide visible, dots + autoplay. */
  function initHeroSlider() {
    var root = document.querySelector("[data-hero-slider]");
    if (!root) {
      return;
    }
    var slides = root.querySelectorAll("[data-hero-slide]");
    var dots = root.querySelectorAll("[data-hero-dot]");
    if (!slides.length || slides.length !== dots.length) {
      return;
    }

    var index = 0;
    var timer = null;
    var transitioning = false;
    var FADE_MS = 350;
    var AUTO_MS = 3500;

    var setDotState = function (i, active) {
      dots[i].classList.toggle("is-active", active);
      dots[i].setAttribute("aria-selected", active ? "true" : "false");
    };

    var setSlideState = function (slide, active) {
      slide.classList.toggle("is-active", active);
      slide.classList.remove("is-leaving");
      slide.setAttribute("aria-hidden", active ? "false" : "true");
    };

    var show = function (next) {
      var target = (next + slides.length) % slides.length;
      if (transitioning || target === index) {
        return;
      }

      transitioning = true;
      var current = slides[index];
      var upcoming = slides[target];

      /* Fade current out fully before bringing the next slide in. */
      current.classList.remove("is-active");
      current.classList.add("is-leaving");
      current.setAttribute("aria-hidden", "true");

      window.setTimeout(function () {
        current.classList.remove("is-leaving");
        upcoming.classList.add("is-active");
        upcoming.setAttribute("aria-hidden", "false");
        setDotState(index, false);
        setDotState(target, true);
        index = target;
        transitioning = false;
      }, FADE_MS);
    };

    var start = function () {
      stop();
      timer = window.setInterval(function () {
        show(index + 1);
      }, AUTO_MS);
    };

    var stop = function () {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    Array.prototype.forEach.call(slides, function (slide, i) {
      setSlideState(slide, i === index);
      slide.removeAttribute("hidden");
    });
    Array.prototype.forEach.call(dots, function (dot, i) {
      setDotState(i, i === index);
      dot.addEventListener("click", function () {
        show(i);
        start();
      });
    });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    });
    start();
  }

  /* Slight shadow reinforcement once the page is scrolled. */
  function initNavShadow() {
    var header = document.querySelector(".pmc-header");
    if (!header) {
      return;
    }
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Nav search — expands into Figma pill input on click. */
  function initNavSearch() {
    var roots = document.querySelectorAll("[data-search]");
    if (!roots.length) {
      return;
    }

    Array.prototype.forEach.call(roots, function (root) {
      var openBtn = root.querySelector("[data-search-open]");
      var panel = root.querySelector("[data-search-panel]");
      var input = root.querySelector("[data-search-input]");
      if (!openBtn || !panel || !input) {
        return;
      }

      var open = function () {
        root.classList.add("is-open");
        panel.hidden = false;
        openBtn.setAttribute("aria-expanded", "true");
        window.setTimeout(function () {
          input.focus();
        }, 40);
      };

      var close = function () {
        root.classList.remove("is-open");
        panel.hidden = true;
        openBtn.setAttribute("aria-expanded", "false");
        input.blur();
      };

      openBtn.addEventListener("click", function (event) {
        event.preventDefault();
        open();
      });

      panel.addEventListener("submit", function (event) {
        event.preventDefault();
        if (!input.value.trim()) {
          close();
        }
      });

      input.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          event.preventDefault();
          close();
          openBtn.focus();
        }
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && root.classList.contains("is-open")) {
          close();
          openBtn.focus();
        }
      });

      document.addEventListener("click", function (event) {
        if (!root.classList.contains("is-open")) {
          return;
        }
        if (!root.contains(event.target)) {
          close();
        }
      });
    });
  }

  /* About values carousel — prev/next on first & last visible card edges. */
  function initValuesCarousel() {
    var root = document.querySelector("[data-values-carousel]");
    if (!root) {
      return;
    }
    var track = root.querySelector("[data-values-track]");
    var prev = root.querySelector("[data-values-prev]");
    var next = root.querySelector("[data-values-next]");
    if (!track || !prev || !next) {
      return;
    }

    var step = function () {
      var card = track.querySelector(".pmc-value-card");
      var gap = parseInt(getComputedStyle(track).gap || getComputedStyle(track).columnGap || "32", 10) || 32;
      return card ? card.getBoundingClientRect().width + gap : Math.round(track.clientWidth * 0.8);
    };

    var syncButtons = function () {
      var max = Math.max(0, track.scrollWidth - track.clientWidth - 2);
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
    };

    prev.addEventListener("click", function () {
      track.scrollBy({ left: -step(), behavior: "smooth" });
    });
    next.addEventListener("click", function () {
      track.scrollBy({ left: step(), behavior: "smooth" });
    });
    track.addEventListener("scroll", syncButtons, { passive: true });
    window.addEventListener("resize", syncButtons);
    syncButtons();
  }

  /* "What we do" carousel — one slide visible, prev/next + dots + autoplay. */
  function initWhatWeDoCarousel() {
    var root = document.querySelector("[data-whatwedo]");
    if (!root) {
      return;
    }
    var track = root.querySelector("[data-whatwedo-track]");
    var slides = root.querySelectorAll("[data-whatwedo-slide]");
    var prev = root.querySelector("[data-whatwedo-prev]");
    var next = root.querySelector("[data-whatwedo-next]");
    var dots = root.querySelectorAll("[data-whatwedo-dot]");
    if (!track || !slides.length) {
      return;
    }

    var index = 0;
    var timer = null;
    var AUTO_MS = 5000;

    var update = function () {
      track.style.transform = "translateX(" + -index * 100 + "%)";
      Array.prototype.forEach.call(dots, function (dot, i) {
        dot.classList.toggle("is-active", i === index);
        dot.setAttribute("aria-selected", i === index ? "true" : "false");
      });
      Array.prototype.forEach.call(slides, function (slide, i) {
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
    };

    var go = function (target) {
      index = (target + slides.length) % slides.length;
      update();
    };

    var start = function () {
      stop();
      timer = window.setInterval(function () {
        go(index + 1);
      }, AUTO_MS);
    };

    var stop = function () {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    if (prev) {
      prev.addEventListener("click", function () {
        go(index - 1);
        start();
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        go(index + 1);
        start();
      });
    }
    Array.prototype.forEach.call(dots, function (dot, i) {
      dot.addEventListener("click", function () {
        go(i);
        start();
      });
    });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    });

    update();
    start();
  }

  /* Featured solutions — two cards per page, side arrows (Case studies). */
  function initCs2Slider() {
    var root = document.querySelector("[data-cs2-slider]");
    if (!root) {
      return;
    }
    var track = root.querySelector("[data-cs2-track]");
    var slides = root.querySelectorAll("[data-cs2-slide]");
    var prev = root.querySelector("[data-cs2-prev]");
    var next = root.querySelector("[data-cs2-next]");
    if (!track || !slides.length) {
      return;
    }

    var index = 0;

    var update = function () {
      track.style.transform = "translateX(" + -index * 100 + "%)";
      Array.prototype.forEach.call(slides, function (slide, i) {
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
    };

    var go = function (target) {
      index = (target + slides.length) % slides.length;
      update();
    };

    if (prev) {
      prev.addEventListener("click", function () {
        go(index - 1);
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        go(index + 1);
      });
    }

    update();
  }

  /* Experts carousel — two cards per slide, progress pills + prev/next. */
  function initExpertsCarousel() {
    var root = document.querySelector("[data-experts]");
    if (!root) {
      return;
    }
    var track = root.querySelector("[data-experts-track]");
    var slides = root.querySelectorAll("[data-experts-slide]");
    var prev = root.querySelector("[data-experts-prev]");
    var next = root.querySelector("[data-experts-next]");
    var dots = root.querySelectorAll("[data-experts-dot]");
    if (!track || !slides.length) {
      return;
    }

    var index = 0;

    var update = function () {
      track.style.transform = "translateX(" + -index * 100 + "%)";
      Array.prototype.forEach.call(dots, function (dot, i) {
        var active = i === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", active ? "true" : "false");
      });
      Array.prototype.forEach.call(slides, function (slide, i) {
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
    };

    var go = function (target) {
      index = (target + slides.length) % slides.length;
      update();
    };

    if (prev) {
      prev.addEventListener("click", function () {
        go(index - 1);
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        go(index + 1);
      });
    }
    Array.prototype.forEach.call(dots, function (dot, i) {
      dot.addEventListener("click", function () {
        go(i);
      });
    });

    update();
  }

  /* Featured videos carousel — one slide visible, side prev/next + autoplay. */
  function initVideosCarousel() {
    var root = document.querySelector("[data-videos]");
    if (!root) {
      return;
    }
    var track = root.querySelector("[data-videos-track]");
    var slides = root.querySelectorAll("[data-videos-slide]");
    var prev = root.querySelector("[data-videos-prev]");
    var next = root.querySelector("[data-videos-next]");
    if (!track || slides.length < 2) {
      return;
    }

    var index = 0;
    var timer = null;
    var AUTO_MS = 6000;

    var update = function () {
      track.style.transform = "translateX(" + -index * 100 + "%)";
      Array.prototype.forEach.call(slides, function (slide, i) {
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
    };

    var go = function (target) {
      index = (target + slides.length) % slides.length;
      update();
    };

    var start = function () {
      stop();
      timer = window.setInterval(function () {
        go(index + 1);
      }, AUTO_MS);
    };

    var stop = function () {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    if (prev) {
      prev.addEventListener("click", function () {
        go(index - 1);
        start();
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        go(index + 1);
        start();
      });
    }

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    });

    update();
    start();
  }

  /* Horizontal sectors carousel — one card per view on mobile/tablet. */
  function initSectorSlider() {
    var slider = document.querySelector("[data-sector-slider]");
    if (!slider) {
      return;
    }
    var track = slider.querySelector("[data-sector-track]");
    var next = slider.querySelector("[data-sector-next]");
    var cards = track ? track.querySelectorAll(".pmc-sector-card") : [];
    if (!track || !cards.length) {
      return;
    }

    var index = 0;
    var mobileQuery = window.matchMedia("(max-width: 991.98px)");

    var setActive = function () {
      Array.prototype.forEach.call(cards, function (card, i) {
        card.classList.toggle("is-active", i === index);
      });
    };

    var updateMobile = function () {
      if (!mobileQuery.matches) {
        track.style.transform = "";
        return;
      }
      track.style.transform = "translateX(" + -index * 100 + "%)";
      setActive();
    };

    var go = function (target) {
      index = (target + cards.length) % cards.length;
      updateMobile();
    };

    if (next) {
      next.addEventListener("click", function () {
        if (!mobileQuery.matches) {
          return;
        }
        go(index + 1);
      });
    }

    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener("change", function () {
        index = 0;
        updateMobile();
      });
    }

    updateMobile();
  }

  /* Career open roles — one jobs page per slide, progress bars + arrows + search. */
  function initJobsCarousel() {
    var root = document.querySelector("[data-jobs]");
    if (!root) {
      return;
    }

    var track = root.querySelector("[data-jobs-track]");
    var slides = root.querySelectorAll("[data-jobs-slide]");
    var prev = root.querySelector("[data-jobs-prev]");
    var next = root.querySelector("[data-jobs-next]");
    var dots = root.querySelectorAll("[data-jobs-dot]");
    var search = root.querySelector("[data-jobs-search]");
    if (!track || !slides.length) {
      return;
    }

    var index = 0;
    var searching = false;

    var updateNav = function () {
      if (prev) {
        prev.classList.toggle("pmc-carousel-btn--ink", index > 0);
        prev.disabled = searching;
      }
      if (next) {
        next.classList.toggle("pmc-carousel-btn--ink", index < slides.length - 1);
        next.disabled = searching;
      }
    };

    var update = function () {
      track.style.transform = "translateX(" + -index * 100 + "%)";
      Array.prototype.forEach.call(dots, function (dot, i) {
        var active = i === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", active ? "true" : "false");
      });
      Array.prototype.forEach.call(slides, function (slide, i) {
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
      updateNav();
    };

    var go = function (target) {
      if (searching) {
        return;
      }
      index = (target + slides.length) % slides.length;
      update();
    };

    var applySearch = function (query) {
      var q = String(query || "").trim().toLowerCase();
      searching = q.length > 0;
      root.classList.toggle("is-searching", searching);

      Array.prototype.forEach.call(slides, function (slide) {
        var groups = slide.querySelectorAll(".pmc-jobs__group");
        var slideHasMatch = false;

        Array.prototype.forEach.call(groups, function (group) {
          var label = group.querySelector(".pmc-jobs__group-label");
          var labelText = label ? label.textContent.toLowerCase() : "";
          var rows = group.querySelectorAll(".pmc-job-row");
          var groupHasMatch = false;

          Array.prototype.forEach.call(rows, function (row) {
            var role = row.querySelector(".pmc-job-row__role");
            var location = row.querySelector(".pmc-job-row__location");
            var haystack = [
              labelText,
              role ? role.textContent.toLowerCase() : "",
              location ? location.textContent.toLowerCase() : ""
            ].join(" ");
            var match = !searching || haystack.indexOf(q) !== -1;
            row.classList.toggle("is-hidden", !match);
            if (match) {
              groupHasMatch = true;
            }
          });

          group.classList.toggle("is-hidden", searching && !groupHasMatch);
          if (groupHasMatch) {
            slideHasMatch = true;
          }
        });

        slide.classList.toggle("is-filtered-empty", searching && !slideHasMatch);
      });

      if (searching) {
        Array.prototype.forEach.call(slides, function (slide) {
          if (!slide.classList.contains("is-filtered-empty")) {
            slide.setAttribute("aria-hidden", "false");
          }
        });
      } else {
        update();
      }

      updateNav();
    };

    if (prev) {
      prev.addEventListener("click", function () {
        go(index - 1);
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        go(index + 1);
      });
    }
    Array.prototype.forEach.call(dots, function (dot, i) {
      dot.addEventListener("click", function () {
        go(i);
      });
    });
    if (search) {
      search.addEventListener("input", function () {
        applySearch(search.value);
      });
    }

    update();
  }

  /* Career Meet our Team — two cards per slide, progress pills + prev/next. */
  function initTeamCarousel() {
    var root = document.querySelector("[data-team]");
    if (!root) {
      return;
    }

    var track = root.querySelector("[data-team-track]");
    var slides = root.querySelectorAll("[data-team-slide]");
    var prev = root.querySelector("[data-team-prev]");
    var next = root.querySelector("[data-team-next]");
    var dots = root.querySelectorAll("[data-team-dot]");
    if (!track || !slides.length) {
      return;
    }

    var index = 0;

    var updateNav = function () {
      if (prev) {
        prev.classList.toggle("pmc-carousel-btn--ink", index > 0);
      }
      if (next) {
        next.classList.toggle("pmc-carousel-btn--ink", index < slides.length - 1);
      }
    };

    var update = function () {
      track.style.transform = "translateX(" + -index * 100 + "%)";
      Array.prototype.forEach.call(dots, function (dot, i) {
        var active = i === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", active ? "true" : "false");
      });
      Array.prototype.forEach.call(slides, function (slide, i) {
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
      updateNav();
    };

    var go = function (target) {
      index = (target + slides.length) % slides.length;
      update();
    };

    if (prev) {
      prev.addEventListener("click", function () {
        go(index - 1);
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        go(index + 1);
      });
    }
    Array.prototype.forEach.call(dots, function (dot, i) {
      dot.addEventListener("click", function () {
        go(i);
      });
    });

    update();
  }

  /* Bootstrap-style client-side validation for contact / career forms. */
  function initFormValidation() {
    var forms = document.querySelectorAll("[data-validate]");
    Array.prototype.forEach.call(forms, function (form) {
      form.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          var note = form.querySelector("[data-form-success]");
          if (note) {
            note.hidden = false;
          }
          form.reset();
        }
        form.classList.add("was-validated");
      });
    });
  }

  /* Career: prefill the application modal's role from the trigger button. */
  function initApplyModal() {
    var modal = document.getElementById("applyModal");
    if (!modal) {
      return;
    }
    modal.addEventListener("show.bs.modal", function (event) {
      var trigger = event.relatedTarget;
      var role = trigger ? trigger.getAttribute("data-role") : "";
      var roleField = modal.querySelector("#apply-role");
      if (roleField && role) {
        roleField.value = role;
      }
      var note = modal.querySelector("[data-form-success]");
      if (note) {
        note.hidden = true;
      }
      var form = modal.querySelector("form");
      if (form) {
        form.classList.remove("was-validated");
      }
    });
  }
})();
