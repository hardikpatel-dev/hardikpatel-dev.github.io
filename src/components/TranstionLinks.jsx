"use client";

import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/lib/animatePage";
import Link from "next/link";

const TransitionLink = ({ href, label, children, onClick, ...props }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e) => {
    e.preventDefault();

    const cleanHref = href.startsWith("/") ? href : `/${href}`;
    if (pathname !== cleanHref) {
      animatePageOut(cleanHref, router);
    } else {
      // same page pe ho toh normal navigation avoid karo
      return;
    }

    if (onClick) onClick();
  };



  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children ? children : label}
    </Link>
  );
};

export default TransitionLink;
