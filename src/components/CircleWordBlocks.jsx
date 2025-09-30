// components/CircleWordBlocks.jsx
"use client";
import React from "react";
import "../app/circleCards.css";
import { IconCode } from "@tabler/icons-react";

const words = [
  "Plan",
  "Design",
  "Code",
  "Iterate",
  "Test",
  "Collaborate",
  "Polish",
  "Ship",
];


export default function CircleWordBlocks() {
  return (
    <div className="void">
      <div className="crop">
        <ul id="card-list" style={{ "--count": words.length }}>
          {words.map((word, i) => (
            <li key={i}>
              <div className="card">
                <span>
                  <span className="model-name">{word}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="last-circle"></div>
        <div className="second-circle"></div>
      </div>
      <div className="mask"></div>
      <div className="center-circle flex items-center justify-center">
        <span style={{fontFamily: "cursive"}} className=" font-extrabold text-6xl">
          <IconCode stroke={2} className="text-text" size={40} />
        </span>
      </div>
    </div>
  );
}
