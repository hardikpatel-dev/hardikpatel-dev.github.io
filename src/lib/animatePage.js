import gsap from "gsap";

// Animate page in with label
export const animatePageIn = (labelText) => {
  const banners = [
    document.getElementById("banner-1"),
    document.getElementById("banner-2"),
    document.getElementById("banner-3"),
    document.getElementById("banner-4"),
  ];
  const label = document.querySelector(".page-label span");

  if (banners.every(Boolean) && label) {
    const tl = gsap.timeline();

    // update text dynamically
    label.textContent = labelText || "";

    tl.set(banners, { yPercent: 0 })
      .to(banners, {
        yPercent: 100,
        stagger: 0.2,
        ease: "power2.inOut",
      })
      .fromTo(
        label,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 4, ease: "power2.out" },
        "-=6" // banners ke beech dikhna start ho
      )
      .to(
        label,
        { opacity: 0, y: 20, duration: 0.4, ease: "power2.in" },
        "-=1" // transition khatam hone se thoda pehle hide ho
      );
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
    const tl = gsap.timeline({
      onComplete: () => {
        if (router && href) router.push(href);
      },
    });

    tl.set(banners, { yPercent: -100 }).to(banners, {
      yPercent: 0,
      stagger: 0.2,
      ease: "power2.inOut",
    });
  }
};
