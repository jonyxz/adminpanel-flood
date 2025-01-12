import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Button from "../../components/Button";
import Table from "../../components/Table";

const Modal = ({ onClose, onSubmit, laporan }) => {
  const [form, setForm] = useState({
    location: '',
    description: '',
    status: 'active',
    date: '',
  });

  useEffect(() => {
    if (laporan) {
      setForm({
        location: laporan.location || '',
        description: laporan.description || '',
        status: laporan.status || 'Active',
        date: laporan.date? new Date(laporan.date).toISOString().split('T')[0] : '',
      });
    }
  }, [laporan]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 className="text-lg font-bold mb-4">
          {laporan ? "Edit Laporan" : "Tambah Laporan"}
        </h3>
        <form onSubmit={handleSubmit}>
          {['location', 'description', 'status', 'date'].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === 'status'?(
                <select name={field} value={form[field]} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="active">Active</option>
                    <option value="resolved">Resolved</option>
                </select>
              ) : (
                <input
                type={field === 'date'? 'date':'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              )
            }
            </div>
          ))}
          <div className="flex justify-end">
            <Button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 mr-2"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              Batal
            </Button>
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
              type="submit"
            >
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Laporan = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const token = localStorage.getItem("auth_token");

  if (!token) {
    Swal.fire("Error", "Token tidak ditemukan. Silakan login terlebih dahulu.", "error");
    return null;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/flood", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Gagal mengambil data Laporan", error);
        Swal.fire("Error", "Gagal mengambil data Laporan", "error");
      }
    };

    fetchData();
  }, [token]);

  const handleFormSubmit = async (formData) => {
    try {
      const response = currentItem
        ? await axios.put(`http://localhost:5000/api/flood/${currentItem._id}`, formData, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          })
        : await axios.post("http://localhost:5000/api/flood", formData, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          });

      setData((prevData) =>
        currentItem
          ? prevData.map((item) => (item._id === currentItem._id ? response.data : item))
          : [...prevData, response.data]
      );
      setCurrentItem(null);
      setModalVisible(false);
      Swal.fire("Success", "Laporan banjir berhasil disimpan", "success");
    } catch (error) {
      console.error("Gagal menyimpan laporan banjir", error);
      Swal.fire("Error", "Gagal menyimpan laporan banjir", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/flood/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prevData) => prevData.filter((item) => item._id !== id));
      Swal.fire("Success", "Laporan berhasil dihapus", "success");
    } catch (error) {
      console.error("Gagal menghapus Laporan", error);
      Swal.fire("Error", "Gagal menghapus Laporan", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {modalVisible && (
        <Modal onClose={() => setModalVisible(false)} onSubmit={handleFormSubmit} laporan={currentItem} />
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Daftar Laporan</h1>
        <Button
          onClick={() => {
            setCurrentItem(null);
            setModalVisible(true);
          }}
          className="bg-blue-500 hover:bg-blue-400 text-white"
        >
          Tambah Laporan
        </Button>
      </div>
      <Table
        data={data}
        handleEdit={(item) => {
          setCurrentItem(item);
          setModalVisible(true);
        }}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Laporan;