"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function UpcomingBills() {
  const [userId, setUserId] = useState(null);
  const [bills, setBills] = useState([]);
<<<<<<< HEAD
  const [visibleBills, setVisibleBills] = useState(7); 
=======
  const [visibleBills, setVisibleBills] = useState(7); // ✅ default 7 bills
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    dueDate: "",
    amount: "",
  });

  const router = useRouter();

<<<<<<< HEAD
  // Get userId from localStorage
=======
  //  Get userId from localStorage
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

<<<<<<< HEAD
  // Fetch bills
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/bills/user/${userId}`)
=======
  // Fetch bills for logged-in user
  useEffect(() => {
    if (!userId) return;
    fetch(`https://backend-1-bqpk.onrender.com/api/bills/user/${userId}`)
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
      .then((res) => res.json())
      .then((data) => setBills(data))
      .catch((err) => console.error("Error fetching bills:", err));
  }, [userId]);

<<<<<<< HEAD
  // Add bill
=======
  //  Add bill
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
  const addBill = async () => {
    if (!form.title || !form.category || !form.dueDate || !form.amount) {
      alert("⚠️ Please fill all fields before adding a bill!");
      return;
    }

    const payload = {
      userId,
      title: form.title,
      category: form.category,
      dueDate: form.dueDate,
      amount: form.amount,
    };

<<<<<<< HEAD
    const res = await fetch("http://localhost:5000/api/bills", {
=======
    const res = await fetch("https://backend-1-bqpk.onrender.com/api/bills", {
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Failed to add bill:", await res.text());
      return;
    }

    const newBill = await res.json();
    setBills([newBill, ...bills]);
    setShowModal(false);
    setForm({ title: "", category: "", dueDate: "", amount: "" });
  };

  // Delete bill
  const deleteBill = async (id) => {
<<<<<<< HEAD
    const res = await fetch(`http://localhost:5000/api/bills/${id}`, {
=======
    const res = await fetch(`https://backend-1-bqpk.onrender.com/api/bills/${id}`, {
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Failed to delete bill:", await res.text());
      return;
    }

    setBills(bills.filter((b) => b._id !== id));
  };

  return (
    <div className="w-full flex justify-center items-start mt-6 px-3 sm:px-6">
      <div className="w-full max-w-5xl">
        {/* Heading */}
        <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
<<<<<<< HEAD
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200">
            Upcoming Bills
          </h2>
          <Button onClick={() => setShowModal(true)} className="bg-teal-600 text-white hover:bg-teal-700">
=======
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
            Upcoming Bills
          </h2>
          <Button onClick={() => setShowModal(true)} className="bg-teal-600 text-white">
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
            Add Your Upcoming Bills
          </Button>
        </div>

<<<<<<< HEAD
        {/* Table */}
        <Card className="p-3 sm:p-5 rounded-xl shadow bg-white dark:bg-gray-900 w-full overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
=======
        {/* Table - Responsive */}
        <Card className="p-3 sm:p-5 rounded-xl shadow bg-white w-full overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-gray-500 border-b">
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
                <th className="py-2 text-left">Due Date</th>
                <th className="py-2 text-left">Category</th>
                <th className="py-2 text-left">Title</th>
                <th className="py-2 text-right">Amount</th>
                <th className="py-2 text-center">Pay Now</th>
                <th className="py-2 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {bills.slice(0, visibleBills).map((bill) => (
<<<<<<< HEAD
                <tr key={bill._id} className="border-b last:border-0 border-gray-200 dark:border-gray-700">
                  <td className="py-3 text-gray-700 dark:text-gray-300">{bill.dueDate?.split("T")[0]}</td>
                  <td className="py-3 text-gray-700 dark:text-gray-300">{bill.category}</td>
                  <td className="py-3 font-medium text-gray-800 dark:text-gray-200">{bill.title}</td>
                  <td className="py-3 font-semibold text-gray-900 dark:text-white text-right">
                    ${bill.amount}
                  </td>
                  <td className="py-3 text-center">
                    <Button size="sm" className="bg-green-500 text-white hover:bg-green-600">
=======
                <tr key={bill._id} className="border-b last:border-0">
                  <td className="py-3">{bill.dueDate?.split("T")[0]}</td>
                  <td className="py-3">{bill.category}</td>
                  <td className="py-3 font-medium text-gray-800">{bill.title}</td>
                  <td className="py-3 font-semibold text-gray-900 text-right">
                    ${bill.amount}
                  </td>
                  <td className="py-3 text-center">
                    <Button size="sm" className="bg-green-500 text-white">
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
                      Pay Now
                    </Button>
                  </td>
                  <td className="py-3 text-center">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteBill(bill._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Load More */}
        {visibleBills < bills.length && (
          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => setVisibleBills((prev) => prev + 7)}>
              Load More
            </Button>
          </div>
        )}

        {/* Back Button */}
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
<<<<<<< HEAD
            className="px-6 py-2 rounded-xl bg-teal-600 text-white hover:bg-teal-700"
=======
          className="px-6 py-2 rounded-xl bg-teal-600 text-white hover:bg-gray-700"
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} /> Back
          </Button>
        </div>

        {/* Modal */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
<<<<<<< HEAD
          <DialogContent className="max-w-md dark:bg-gray-900">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100">Add New Bill</DialogTitle>
=======
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Bill</DialogTitle>
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
            </DialogHeader>
            <div className="space-y-3">
              {/* Category Dropdown */}
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
<<<<<<< HEAD
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
=======
                className="w-full p-2 border rounded-lg"
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
              >
                <option value="">Select Category</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Figma">Figma</option>
                <option value="Adobe">Adobe</option>
                <option value="Netflix">Netflix</option>
              </select>

              {/* Title */}
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
<<<<<<< HEAD
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
=======
                className="w-full p-2 border rounded-lg"
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
                required
              />

              {/* Amount */}
              <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
<<<<<<< HEAD
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
=======
                className="w-full p-2 border rounded-lg"
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
                required
              />

              {/* Date Picker */}
              <div className="flex items-center gap-2">
<<<<<<< HEAD
                <Calendar className="text-gray-600 dark:text-gray-300" />
=======
                <Calendar className="text-gray-600" />
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
<<<<<<< HEAD
                  className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
=======
                  className="w-full p-2 border rounded-lg"
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
                  required
                />
              </div>

              {/* Add Button */}
<<<<<<< HEAD
              <Button className="w-full bg-teal-600 text-white hover:bg-teal-700" onClick={addBill}>
=======
              <Button className="w-full bg-teal-600 text-white" onClick={addBill}>
>>>>>>> 1760b9530f8e3987ce454485b5298e7c470876e4
                Add Bill
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
