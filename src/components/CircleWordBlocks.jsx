// components/CircleWordBlocks.jsx
"use client";
import React from "react";
import "../app/circleCards.css";
import { IconSettings } from "@tabler/icons-react";
import techStack from "@/data/tech-stack";
import Image from "next/image";


export default function CircleWordBlocks() {
  const items = techStack.slice(0, 8);
  return (
    <div className="void">
      <div className="crop">
        <ul id="card-list" style={{ "--count": items.length }}>
          {items.map((tech, i) => (
            <li key={tech.id}>
              <div className="card flex items-center justify-center">
                <a
                  href={tech.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Image
                    src={tech.icon}
                    alt={tech.id}
                    width={32}
                    height={32}
                    className="object-contain svg-invert"
                  />
                </a>
              </div>
            </li>
          ))}
        </ul>
        <div className="last-circle"></div>
        <div className="second-circle"></div>
      </div>
      <div className="mask"></div>
      <div className="center-circle flex items-center justify-center">
        <span className="text-6xl">
          <IconSettings
            stroke={1}
            className="text-text animate-spin-slow"
            size={40}
          />
        </span>
      </div>
    </div>
  );
}
