"use client";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/health`)
      .then((response) => {
        setMessage(response.data.message);
        setError("");
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(`Error: ${err.message}`);
        setMessage("");
      });
  }, [API_URL]);

  return (
    <div>
      <h1>Hello World</h1>
      <p>{message}</p>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <p>API URL: {API_URL}</p>
    </div>
  );
}