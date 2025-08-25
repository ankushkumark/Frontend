// hooks/useExpenses.js
"use client";
import { useEffect, useState } from "react";

export default function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [email, setEmail] = useState(null);
const [userId, setUserId] = useState(null); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail"); 
    if (!userEmail) {
      setLoading(false);
      return;
    }
    setEmail(userEmail);

    const fetchData = async () => {
      try {
        const res = await fetch(`https://backend-1-bqpk.onrender.com/api/expenses/${userEmail}`);
        if (!res.ok) throw new Error("Failed to fetch expenses");
        const data = await res.json();
        setExpenses(data);
      } catch (err) {
        console.error("Error fetching expenses:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update expense
  const updateExpense = async (title, newAmount, category) => {
  if (!userId || !title || !newAmount) return;

  try {
    const email = localStorage.getItem("userEmail"); 

    const res = await fetch(
      `https://backend-1-bqpk.onrender.com/api/expenses/${userId}/${title}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(newAmount),
          date: new Date(),
          category,   
          email,     
        }),
      }
    );

    if (!res.ok) throw new Error("Failed to update expense");
    const updatedExpense = await res.json();

    setExpenses((prev) =>
      prev.map((e) => (e.title === title ? updatedExpense : e))
    );
  } catch (err) {
    console.error("Error saving expense:", err);
    setError(err.message);
  }
};


return { expenses, loading, error, updateExpense, userId };
}
