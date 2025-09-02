document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".reviews__carousel");
  const container = document.querySelector(".reviews__container");
  const cards = Array.from(document.querySelectorAll(".review-card"));
  const prevBtn = document.querySelector(".reviews__button.prev");
  const nextBtn = document.querySelector(".reviews__button.next");

  let currentIndex = 0;
  let cardsPerView = 1;

  // ---------- Функции ----------
  const getCardsPerView = () => {
    const width = window.innerWidth;
    if (width >= 1025) return 3;
    if (width >= 769) return 2;
    return 1;
  };

  const getCardWidth = () => {
    const gap = parseInt(getComputedStyle(container).gap) || 0;
    return carousel.offsetWidth / cardsPerView - gap;
  };

  const updateCarousel = () => {
    const cardWidth = getCardWidth();
    container.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateButtons();
  };

  const updateButtons = () => {
    if (cards.length <= cardsPerView) {
      setButtonState(prevBtn, false);
      setButtonState(nextBtn, false);
      return;
    }
    setButtonState(prevBtn, currentIndex > 0);
    setButtonState(nextBtn, currentIndex < cards.length - cardsPerView);
  };

  const setButtonState = (button, active) => {
    button.style.opacity = active ? "1" : "0.4";
    button.style.cursor = active ? "pointer" : "default";
  };

  const next = () => {
    if (currentIndex < cards.length - cardsPerView) {
      currentIndex++;
      updateCarousel();
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  };

  const handleSwipe = () => {
    let startX = 0;
    container.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    container.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) next();
      if (endX - startX > 50) prev();
    });
  };

  const handleResize = () => {
    window.addEventListener("resize", () => {
      cardsPerView = getCardsPerView();
      if (currentIndex > cards.length - cardsPerView) {
        currentIndex = cards.length - cardsPerView;
      }
      updateCarousel();
    });
  };

  // ---------- Инициализация ----------
  const init = () => {
    cardsPerView = getCardsPerView();
    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);
    handleSwipe();
    handleResize();
    updateCarousel();
  };

  init();
});
