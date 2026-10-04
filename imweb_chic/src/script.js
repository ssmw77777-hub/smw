/* =========================================================
   CHIC STUDIO — 설정 & 포트폴리오 데이터
   ---------------------------------------------------------
   ✅ 포트폴리오 추가 방법
   아래 CHIC_WORKS 배열에 { ... } 블록 하나를 복사해서 붙여넣고 내용만 바꾸면
   [메인 배너 슬라이드]와 [Works 그리드]에 자동으로 반영됩니다.

   title    : 프로젝트명 (영문 추천)
   client   : 고객사명 / 한 줄 설명
   category : CHIC_CATEGORIES 의 key 중 하나 (corporate / shop / brand / landing)
   year     : 제작 연도
   image    : 썸네일 이미지 URL (아임웹 > 파일 업로드 후 주소 복사)
              비워두면 color 값으로 자동 목업 썸네일이 생성됩니다.
   color    : 이미지가 없을 때 사용할 배경색
   url      : 클릭 시 이동할 주소 (실제 사이트 또는 상세 페이지)
   desc     : 배너에 노출될 한 줄 설명
   featured : true 이면 상단 배너 슬라이드에도 노출
   ========================================================= */
var CHIC_CONFIG = {
  kakaoUrl: 'https://pf.kakao.com/_xxxxxx', // 카카오톡 채널 주소
  worksPerPage: 6,                          // Works 그리드 첫 화면 노출 개수
  slideInterval: 5500                       // 배너 자동 넘김 간격 (ms)
};

var CHIC_CATEGORIES = {
  corporate: '기업 · 브랜드',
  shop: '쇼핑몰',
  brand: '포트폴리오 · 스튜디오',
  landing: '랜딩페이지'
};

var CHIC_WORKS = [
  { title: 'Maison Verde',  client: '메종베르데 · 리빙 브랜드',     category: 'shop',      year: '2026', image: '', color: '#2f3e34', url: '#', desc: '자연에서 온 리빙 오브제를 담은 감도 높은 쇼핑몰', featured: true },
  { title: 'Lumière Clinic', client: '뤼미에르 피부과',            category: 'corporate', year: '2026', image: '', color: '#c9b8a6', url: '#', desc: '신뢰와 고급스러움을 담은 클리닉 공식 홈페이지',   featured: true },
  { title: 'ONDO Coffee',   client: '온도 커피 로스터스',          category: 'brand',     year: '2025', image: '', color: '#6b3a22', url: '#', desc: '로스터리의 온기를 전하는 브랜드 스토리 사이트',   featured: true },
  { title: 'Bloom Lab',     client: '블룸랩 · 플라워 클래스',       category: 'landing',   year: '2025', image: '', color: '#e7a0a8', url: '#', desc: '클래스 예약 전환율을 2배로 높인 랜딩페이지',      featured: true },
  { title: 'Haus & Co',     client: '하우스앤코 인테리어',          category: 'corporate', year: '2025', image: '', color: '#1f2a44', url: '#', desc: '시공 사례 중심의 인테리어 회사 홈페이지' },
  { title: 'Nordic Pet',    client: '노르딕펫 · 반려용품',          category: 'shop',      year: '2025', image: '', color: '#8aa39b', url: '#', desc: '정기구독 기능을 갖춘 반려용품 쇼핑몰' },
  { title: 'Atelier Mori',  client: '아틀리에 모리 · 사진 스튜디오', category: 'brand',     year: '2024', image: '', color: '#3b3b3b', url: '#', desc: '작품이 돋보이는 미니멀 포트폴리오 사이트' },
  { title: 'Run Seoul',     client: '런서울 · 마라톤 이벤트',       category: 'landing',   year: '2024', image: '', color: '#d9502e', url: '#', desc: '참가 신청 DB를 수집하는 이벤트 랜딩' },
  { title: 'Gaon Law',      client: '가온 법률사무소',              category: 'corporate', year: '2024', image: '', color: '#4a4237', url: '#', desc: '상담 신청 동선을 최적화한 법률사무소 홈페이지' }
];


/* =========================================================
   이하 동작 코드 — 수정하지 않아도 됩니다.
   ========================================================= */
(function () {
  function init() {
    var root = document.getElementById('chic');
    if (!root || root.dataset.ready) return;
    root.dataset.ready = '1';

    var $ = function (s, c) { return (c || root).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || root).querySelectorAll(s)); };
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); };
    var isExternal = function (u) { return /^https?:\/\//.test(u) && u.indexOf(location.host) === -1; };

    /* ---------- 썸네일 (이미지 or 자동 목업) ---------- */
    function shade(hex, amt) {
      var n = parseInt(hex.replace('#', ''), 16);
      var r = Math.max(0, Math.min(255, (n >> 16) + amt));
      var g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt));
      var b = Math.max(0, Math.min(255, (n & 255) + amt));
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    function mock(w) {
      var c = w.color || '#999999';
      return '<div class="ch-mock" aria-hidden="true"><div class="ch-mock__bar"><i></i><i></i><i></i></div>' +
        '<div class="ch-mock__body"><b>' + esc(w.title) + '</b><span class="ln"></span><span class="ln"></span><span class="ln"></span>' +
        '<div class="gr"><span style="background:' + c + '"></span><span style="background:' + shade(c, 40) + '"></span><span style="background:' + shade(c, 80) + '"></span></div></div></div>';
    }
    function bgStyle(w) {
      if (w.image) return 'background-image:url(\'' + encodeURI(w.image) + '\')';
      var c = w.color || '#999999';
      return 'background:linear-gradient(135deg,' + shade(c, 30) + ' 0%,' + c + ' 55%,' + shade(c, -30) + ' 100%)';
    }
    function linkAttr(u) { return 'href="' + esc(u || '#') + '"' + (isExternal(u || '') ? ' target="_blank" rel="noopener"' : ''); }

    /* ---------- 배너 슬라이더 ---------- */
    (function slider() {
      var track = $('#chSlideTrack');
      if (!track) return;
      var items = CHIC_WORKS.filter(function (w) { return w.featured; });
      if (!items.length) items = CHIC_WORKS.slice(0, 4);
      if (!items.length) { $('#chFeature').style.display = 'none'; return; }

      track.innerHTML = items.map(function (w) {
        return '<article class="ch-slide">' +
          '<div class="ch-slide__bg" style="' + bgStyle(w) + '"></div>' +
          (w.image ? '' : '<div class="ch-slide__mock">' + mock(w) + '</div>') +
          '<div class="ch-slide__info"><div>' +
            '<div class="ch-slide__tags"><span>' + esc(CHIC_CATEGORIES[w.category] || w.category) + '</span><span>' + esc(w.year) + '</span></div>' +
            '<h3 class="ch-slide__title">' + esc(w.title) + '</h3>' +
            '<p class="ch-slide__desc">' + esc(w.desc || w.client) + '</p>' +
          '</div><a class="ch-slide__link" ' + linkAttr(w.url) + '>View<br>Project ↗</a></div>' +
        '</article>';
      }).join('');

      var slides = $$('.ch-slide', track), idx = 0, timer = null, paused = false;
      var bar = $('#chSlideBar'), now = $('#chSlideNow');
      var pad = function (n) { return (n < 10 ? '0' : '') + n; };
      $('#chSlideTotal').textContent = pad(slides.length);

      function runBar() {
        bar.classList.remove('run'); void bar.offsetWidth;
        bar.style.animationDuration = CHIC_CONFIG.slideInterval + 'ms';
        if (!paused && !reduce && slides.length > 1) bar.classList.add('run');
      }
      function go(i) {
        idx = (i + slides.length) % slides.length;
        track.style.transform = 'translateX(' + (-idx * 100) + '%)';
        slides.forEach(function (s, k) { s.classList.toggle('is-active', k === idx); s.setAttribute('aria-hidden', k !== idx); });
        now.textContent = pad(idx + 1);
        restart();
      }
      function restart() {
        clearTimeout(timer); runBar();
        if (!paused && !reduce && slides.length > 1) timer = setTimeout(function () { go(idx + 1); }, CHIC_CONFIG.slideInterval);
      }
      $('#chPrev').addEventListener('click', function () { go(idx - 1); });
      $('#chNext').addEventListener('click', function () { go(idx + 1); });
      var box = $('#chSlider');
      box.addEventListener('mouseenter', function () { paused = true; restart(); });
      box.addEventListener('mouseleave', function () { paused = false; restart(); });

      // 터치 스와이프
      var sx = 0, sy = 0, dragging = false;
      track.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; dragging = true; }, { passive: true });
      track.addEventListener('touchend', function (e) {
        if (!dragging) return; dragging = false;
        var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(idx + (dx < 0 ? 1 : -1));
      });
      go(0);
    })();

    /* ---------- Works 그리드 + 필터 ---------- */
    (function works() {
      var grid = $('#chGrid'), filter = $('#chFilter'), more = $('#chMore');
      if (!grid) return;
      var cat = 'all', shown = CHIC_CONFIG.worksPerPage;

      var cats = [['all', 'All', CHIC_WORKS.length]];
      Object.keys(CHIC_CATEGORIES).forEach(function (k) {
        var n = CHIC_WORKS.filter(function (w) { return w.category === k; }).length;
        if (n) cats.push([k, CHIC_CATEGORIES[k], n]);
      });
      filter.innerHTML = cats.map(function (c, i) {
        return '<button type="button" role="tab" data-cat="' + c[0] + '" class="' + (i ? '' : 'is-on') + '" aria-selected="' + (!i) + '">' + esc(c[1]) + '<sup>' + c[2] + '</sup></button>';
      }).join('');

      function render() {
        var list = CHIC_WORKS.filter(function (w) { return cat === 'all' || w.category === cat; });
        grid.innerHTML = list.slice(0, shown).map(function (w) {
          return '<a class="ch-card" ' + linkAttr(w.url) + '>' +
            '<div class="ch-card__thumb"><div class="bg" style="' + bgStyle(w) + '"></div>' + (w.image ? '' : mock(w)) + '<span class="ch-card__view">VIEW</span></div>' +
            '<div class="ch-card__meta"><div><h3 class="ch-card__title">' + esc(w.title) + '</h3><p class="ch-card__client">' + esc(w.client) + ' · ' + esc(w.year) + '</p></div>' +
            '<span class="ch-card__tag">' + esc(CHIC_CATEGORIES[w.category] || w.category) + '</span></div></a>';
        }).join('');
        more.parentNode.hidden = list.length <= shown;
        $$('.ch-card', grid).forEach(function (el, i) { setTimeout(function () { el.classList.add('is-in'); }, 60 * (i % CHIC_CONFIG.worksPerPage)); });
      }
      filter.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        $$('button', filter).forEach(function (x) { x.classList.toggle('is-on', x === b); x.setAttribute('aria-selected', x === b); });
        cat = b.dataset.cat; shown = CHIC_CONFIG.worksPerPage; render();
      });
      more.addEventListener('click', function () { shown += CHIC_CONFIG.worksPerPage; render(); });
      render();
    })();

    /* ---------- 헤더 / 모바일 메뉴 ---------- */
    var header = $('#chHeader'), topBtn = $('#chTopBtn'), lastY = window.scrollY;
    function onScroll() {
      var y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 40);
      header.classList.toggle('is-hidden', y > lastY && y > 400 && !root.classList.contains('menu-open'));
      topBtn.classList.toggle('is-on', y > 800);
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

    var burger = $('#chBurger'), menu = $('#chMenu');
    function toggleMenu(open) {
      root.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open); menu.setAttribute('aria-hidden', !open);
      document.documentElement.style.overflow = open ? 'hidden' : '';
    }
    burger.addEventListener('click', function () { toggleMenu(!root.classList.contains('menu-open')); });

    // 앵커 부드러운 스크롤 (헤더 높이 보정)
    root.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#ch"]'); if (!a) return;
      var t = document.getElementById(a.getAttribute('href').slice(1)); if (!t) return;
      e.preventDefault(); toggleMenu(false);
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: reduce ? 'auto' : 'smooth' });
    });
    topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

    // 카카오 링크
    $$('.js-kakao').forEach(function (a) { a.href = CHIC_CONFIG.kakaoUrl; a.target = '_blank'; a.rel = 'noopener'; });
    $('#chYear').textContent = new Date().getFullYear();

    /* ---------- 히어로 ---------- */
    requestAnimationFrame(function () { $('.ch-hero').classList.add('is-in'); });
    var words = $$('#chRotate > span'), w = 0;
    if (words.length > 1 && !reduce) setInterval(function () {
      words[w].classList.remove('is-on'); w = (w + 1) % words.length; words[w].classList.add('is-on');
    }, 2400);

    /* ---------- FAQ ---------- */
    $('#chFaq').addEventListener('click', function (e) {
      var q = e.target.closest('.ch-faq__q'); if (!q) return;
      var item = q.parentNode, open = item.classList.contains('is-open');
      $$('.ch-faq__item', this).forEach(function (x) { x.classList.remove('is-open'); });
      if (!open) item.classList.add('is-open');
    });

    /* ---------- 스크롤 등장 / 카운터 / 활성 메뉴 ---------- */
    function count(el) {
      var end = +el.dataset.count, suf = el.dataset.suffix ? '<sup>' + el.dataset.suffix + '</sup>' : '', t0 = null, dur = 1600;
      if (reduce) { el.innerHTML = end + suf; return; }
      (function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1), v = Math.round(end * (1 - Math.pow(1 - p, 4)));
        el.innerHTML = v + suf;
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add('is-in');
          $$('[data-count]', en.target).forEach(count);
          io.unobserve(en.target);
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      $$('.rv').forEach(function (el) { io.observe(el); });

      var navLinks = $$('.ch-nav a');
      var spy = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (!en.isIntersecting) return;
          navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      navLinks.forEach(function (a) { var s = document.getElementById(a.getAttribute('href').slice(1)); if (s) spy.observe(s); });
    } else {
      $$('.rv').forEach(function (el) { el.classList.add('is-in'); });
      $$('[data-count]').forEach(count);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
