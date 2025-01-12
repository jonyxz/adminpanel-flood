import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [jumlahItem, setJumlahItem] = useState(0);
  const [loadingItem, setLoadingItem] = useState(true);
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchLaporanCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/flood",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJumlahItem(response.data.length || 0);
      } catch (error) {
        console.error("Gagal mengambil data laporan banjir", error);
      } finally {
        setLoadingItem(false);
      }
    };

    fetchLaporanCount();
  }, [token]);

  return (
    <div className="bg-white shadow rounded p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-700">Selamat datang di panel admin</p>
      {loadingItem ? (
        <p>Loading...</p>
      ) : (
        <p>Jumlah Laporan Banjir: {jumlahItem}</p>
      )}
    </div>
  );
};

export default Dashboard;