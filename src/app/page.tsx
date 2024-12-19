"use client";

import Button from "@mui/material/Button";
import Link from "next/link";

export default function StarterPage() {
  const addScramble = async () => {
    const response = await fetch("http://localhost:8080/scrambles", {
      cache: "no-store",
      method: "POST",
    });
    const location = response.headers.get("Location");
    const scrambleId = location?.split("/").pop();

    if (scrambleId) {
      window.location.href = `/scrambles/${scrambleId}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex flex-col justify-center items-center text-white">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold leading-tight mb-4">
          Welcome to my Speed Cube Application
        </h1>
        <h2 className="text-xl max-w-2xl mx-auto">
          This app is designed to help you generate random Rubik's Cube
          scrambles and time your solves. Whether you're a beginner or a pro,
          we've got you covered!
        </h2>
      </div>

      <div className="flex flex-col gap-6 items-center w-full md:w-1/2">
        <Button
          variant="contained"
          color="primary"
          className="py-3 text-lg hover:scale-105 transform transition-all duration-200"
          style={{ borderRadius: "12px" }}
          onClick={addScramble}
        >
          Start New Solve
        </Button>

        <Link href="/scrambles">
          <Button
            variant="contained"
            color="secondary"
            className="w-full py-3 text-lg hover:scale-105 transform transition-all duration-200"
            style={{ borderRadius: "12px" }}
          >
            History
          </Button>
        </Link>
      </div>

      <div className="absolute bottom-10 text-center w-full">
        <p className="text-sm opacity-80">Powered by Next.js & MUI</p>
      </div>
    </div>
  );
}
