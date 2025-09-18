import gsap from "gsap";

// Page In (jab naye page ka content aa raha hai)
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

// Page Out (jab hum dusre page pe ja rahe hain)
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
          // 👇 out animation complete hote hi navigate karo
          if (router && href) router.push(href);
          // Suspense fallback ab turant visible ho jayega
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
