"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Report {
  id: number;
  file: string;
  location: string;
  date_time: string;
  detail: string;
  created_by: string;
  update_at: string;
  status: string;
}

export default function ReportDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedStatuses, setUpdatedStatuses] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    const { data, error } = await supabase.from("reportform").select("*");

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    setReports(data as Report[]);
    setLoading(false);
  }

  async function updateStatus(id: number) {
    const newStatus = updatedStatuses[id];
    if (!newStatus) return;

    const { error } = await supabase
      .from("reportform")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Error updating status:", error);
    } else {
      console.log(`Status for report ID ${id} updated to ${newStatus}`);
      fetchReports();
    }
  }

  return (
    <div className="container">
      <h2>Report Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>File</th>
              <th>Location</th>
              <th>Date & Time</th>
              <th>Detail</th>
              <th>Created By</th>
              <th>Updated At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>
                  <a
                    href={report.file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View File
                  </a>
                </td>
                <td>{report.location}</td>
                <td>{new Date(report.date_time).toLocaleString()}</td>
                <td>{report.detail}</td>
                <td>{report.created_by}</td>
                <td>{new Date(report.update_at).toLocaleString()}</td>
                <td
                  className={
                    updatedStatuses[report.id] === "Ongoing" ||
                    (!updatedStatuses[report.id] && report.status === "Ongoing")
                      ? "status-yellow"
                      : "status-green"
                  }
                >
                  <select
                    value={updatedStatuses[report.id] || report.status}
                    onChange={(e) =>
                      setUpdatedStatuses((prev) => ({
                        ...prev,
                        [report.id]: e.target.value,
                      }))
                    }
                  >
                    <option value="Ongoing">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => updateStatus(report.id)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <style jsx>{`
        .container {
          padding: 20px;
          background-color: white;
          color: black;
          min-height: 100vh;
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          background: white;
        }
        th,
        td {
          padding: 12px;
          border: 1px solid #ddd;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
          font-weight: bold;
        }
        .status-green {
          color: green;
          font-weight: bold;
        }
        select {
          padding: 5px;
          border-radius: 4px;
          border: 1px solid #ccc;
          cursor: pointer;
        }
        button {
          padding: 6px 12px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: 0.3s;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
