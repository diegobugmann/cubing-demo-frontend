"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import nextConfig from "../../next.config";
const { env } = nextConfig;

export default function Stopwatch({ id }: { id: number }) {
  const [spacebarPressed, setSpacebarPressed] = useState(false);
  const [isReadyToSolve, setIsReadyToSolve] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const [elapsedTime, setElapsedTime] = useState(0);
  const elapsedTimeRef = useRef(elapsedTime);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    elapsedTimeRef.current = elapsedTime;
  }, [elapsedTime]);

  const updateScramble = useCallback(async () => {
    await fetch(env?.NEXT_PUBLIC_API_URL + `/scrambles/${id}`, {
      cache: "no-store",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ time: elapsedTimeRef.current }),
    });
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " && isRunning) {
        handleEnd();
      } else if (event.key === " " && !spacebarPressed) {
        console.log("YES");
        const id = setTimeout(() => {
          setIsReadyToSolve(true);
        }, 800);
        setTimeoutId(id);
      }
      setSpacebarPressed(true);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key !== " ") return; // only consider spacebar
      setSpacebarPressed(false);
      if (isReadyToSolve) {
        handleStart();
        setIsReadyToSolve(false);
      }
      removeTimeout();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      removeTimeout();
    };
  }, [spacebarPressed, timeoutId, isReadyToSolve]);

  const removeTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        if (startTime) {
          const timePassed = Math.floor(Date.now() - startTime);
          setElapsedTime(timePassed);
        }
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(Date.now());
  };

  const handleEnd = () => {
    setIsRunning(false);
    setStartTime(null);
    updateScramble();
  };

  const formatTime = (timeInMs: number) => {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(1, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    const roundedMilliseconds = Math.round((timeInMs % 1000) / 10)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}:${roundedMilliseconds}`;
  };

  const instructionText = () => {
    if (isReadyToSolve) return "Release to start";
    if (isRunning) return "Solve!";
    if (elapsedTimeRef.current !== 0) return "Time was saved!";
    else return "Hold Space until ready";
  };

  return (
    <div>
      <p>{instructionText()}</p>
      <div
        className="text-4xl mt-4"
        style={{
          color: isReadyToSolve ? "green" : isRunning ? "red" : "black",
        }}
      >
        {formatTime(elapsedTime)}
      </div>
    </div>
  );
}
