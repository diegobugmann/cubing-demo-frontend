"use client";

import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import dayjs from "dayjs";

export default function ScrambleList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchScrambles = async (pageNumber) => {
    const response = await fetch(
      `http://localhost:8080/scrambles?page=${pageNumber - 1}&size=15`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    if (data.content.length === 0 && pageNumber > 1) {
      setPage(pageNumber - 1);
      return;
    }
    setPosts(data.content);
    setTotalPages(data.totalPages);
  };

  const deleteScramble = async (id) => {
    await fetch(`http://localhost:8080/scrambles/${id}`, {
      cache: "no-store",
      method: "DELETE",
    });
    fetchScrambles(page);
  };

  useEffect(() => {
    fetchScrambles(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="text-center">
      <div className="overflow-x-auto mx-10">
        <table className="min-w-full table-fixed border border-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-center text-md font-bold text-gray-200">
                Scramble
              </th>
              <th className="px-4 py-2 text-center text-md font-bold text-gray-200">
                Time (s)
              </th>
              <th className="px-4 py-2 text-center text-md font-bold text-gray-200">
                Date
              </th>
              <th className="px-4 py-2 text-center text-md font-bold text-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-gray-300 transition-all duration-200"
                >
                  <td className="px-4 py-1 text-sm">{post.movesAsString}</td>
                  <td className="px-4 py-1 text-sm">
                    {post.time
                      ? (Math.round(post.time / 10) / 100).toFixed(2)
                      : "-"}
                  </td>
                  <td className="px-4 py-1 text-sm">
                    {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")}
                  </td>
                  <td className="px-4 py-1 text-center">
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => deleteScramble(post.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-2 text-center text-sm text-gray-500"
                >
                  No history available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
          className="flex justify-center"
        />
      </div>
    </div>
  );
}
