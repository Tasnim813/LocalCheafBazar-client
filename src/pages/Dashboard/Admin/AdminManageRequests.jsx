import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminManageRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/role-requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Fetch requests error:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/role-requests/approve/${id}`);
      Swal.fire("Success", "Request approved", "success");
      setRequests((prev) => prev.map(r => r._id === id ? { ...r, requestStatus: "approved" } : r));
    } catch (err) {
      Swal.fire("Error", "Failed to approve request", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/role-requests/reject/${id}`);
      Swal.fire("Rejected", "Request rejected", "info");
      setRequests((prev) => prev.map(r => r._id === id ? { ...r, requestStatus: "rejected" } : r));
    } catch (err) {
      Swal.fire("Error", "Failed to reject request", "error");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Role Requests</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Type</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Time</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r._id}>
              <td className="border px-2 py-1">{r.userName}</td>
              <td className="border px-2 py-1">{r.userEmail}</td>
              <td className="border px-2 py-1">{r.requestType}</td>
              <td className="border px-2 py-1">{r.requestStatus}</td>
              <td className="border px-2 py-1">{new Date(r.requestTime).toLocaleString()}</td>
              <td className="border px-2 py-1 flex gap-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded disabled:bg-gray-300"
                  disabled={r.requestStatus !== "pending"}
                  onClick={() => handleApprove(r._id)}
                >Accept</button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded disabled:bg-gray-300"
                  disabled={r.requestStatus !== "pending"}
                  onClick={() => handleReject(r._id)}
                >Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageRequests;
