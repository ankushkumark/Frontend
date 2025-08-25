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
  const [visibleBills, setVisibleBills] = useState(7); // ✅ default 7 bills
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "",
    dueDate: "",
    amount: "",
  });

  const router = useRouter();

  //  Get userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Fetch bills for logged-in user
  useEffect(() => {
    if (!userId) return;
    fetch(`https://backend-1-bqpk.onrender.com/api/bills/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setBills(data))
      .catch((err) => console.error("Error fetching bills:", err));
  }, [userId]);

  //  Add bill
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

    const res = await fetch("https://backend-1-bqpk.onrender.com/api/bills", {
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
    const res = await fetch(`https://backend-1-bqpk.onrender.com/api/bills/${id}`, {
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
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
            Upcoming Bills
          </h2>
          <Button onClick={() => setShowModal(true)} className="bg-teal-600 text-white">
            Add Your Upcoming Bills
          </Button>
        </div>

        {/* Table - Responsive */}
        <Card className="p-3 sm:p-5 rounded-xl shadow bg-white w-full overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-gray-500 border-b">
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
                <tr key={bill._id} className="border-b last:border-0">
                  <td className="py-3">{bill.dueDate?.split("T")[0]}</td>
                  <td className="py-3">{bill.category}</td>
                  <td className="py-3 font-medium text-gray-800">{bill.title}</td>
                  <td className="py-3 font-semibold text-gray-900 text-right">
                    ${bill.amount}
                  </td>
                  <td className="py-3 text-center">
                    <Button size="sm" className="bg-green-500 text-white">
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
          className="px-6 py-2 rounded-xl bg-teal-600 text-white hover:bg-gray-700"
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} /> Back
          </Button>
        </div>

        {/* Modal */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Bill</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {/* Category Dropdown */}
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full p-2 border rounded-lg"
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
                className="w-full p-2 border rounded-lg"
                required
              />

              {/* Amount */}
              <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />

              {/* Date Picker */}
              <div className="flex items-center gap-2">
                <Calendar className="text-gray-600" />
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              {/* Add Button */}
              <Button className="w-full bg-teal-600 text-white" onClick={addBill}>
                Add Bill
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
