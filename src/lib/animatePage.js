import gsap from "gsap";

// Only banners animation
export const animatePageIn = () => {
  const banners = [
    document.getElementById("banner-1"),
    document.getElementById("banner-2"),
    document.getElementById("banner-3"),
    document.getElementById("banner-4"),
  ];

  if (banners.every(Boolean)) {
    gsap.timeline().set(banners, { yPercent: 0 }).to(banners, {
      yPercent: 100,
      stagger: 0.2,
      ease: "power2.inOut",
      duration: 0.6,
    });
  }
};

export const animatePageOut = (href, router) => {
  const banners = [
    document.getElementById("banner-1"),
    document.getElementById("banner-2"),
    document.getElementById("banner-3"),
    document.getElementById("banner-4"),
  ];

  if (banners.every(Boolean)) {
    gsap
      .timeline({
        onComplete: () => {
          if (router && href) router.push(href);
        },
      })
      .set(banners, { yPercent: -100 })
      .to(banners, {
        yPercent: 0,
        stagger: 0.2,
        ease: "power2.inOut",
        duration: 0.6,
      });
  }
};
