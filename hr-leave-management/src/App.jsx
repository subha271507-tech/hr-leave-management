import React, { useState } from "react";

function App() {
  const [employee, setEmployee] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [reason, setReason] = useState("");
  const [filter, setFilter] = useState("");

  const [leaves, setLeaves] = useState([
    {
      id: 1,
      employee: "Ravi",
      leaveDate: "2026-06-20",
      reason: "Personal Work",
      status: "Pending",
    },
  ]);

  const applyLeave = (e) => {
    e.preventDefault();

    const newLeave = {
      id: Date.now(),
      employee,
      leaveDate,
      reason,
      status: "Pending",
    };

    setLeaves([...leaves, newLeave]);
    setEmployee("");
    setLeaveDate("");
    setReason("");
  };

  const updateStatus = (id, status) => {
    setLeaves(
      leaves.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      )
    );
  };

  const filteredLeaves = filter
    ? leaves.filter((leave) =>
        leave.employee.toLowerCase().includes(filter.toLowerCase())
      )
    : leaves;

  return (
    <div style={{ padding: "20px" }}>
      <h2>HR Employee Leave Management Tool</h2>

      {/* Leave Form */}
      <form onSubmit={applyLeave}>
        <input
          type="text"
          placeholder="Employee Name"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          required
        />

        <input
          type="date"
          value={leaveDate}
          onChange={(e) => setLeaveDate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />

        <button type="submit">Apply Leave</button>
      </form>

      <br />

      {/* Filter */}
      <input
        type="text"
        placeholder="Filter by Employee"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <h3>Leave History</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.employee}</td>
              <td>{leave.leaveDate}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>
                <button
                  onClick={() =>
                    updateStatus(leave.id, "Approved")
                  }
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(leave.id, "Rejected")
                  }
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;