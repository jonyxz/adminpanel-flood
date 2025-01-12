import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Table = ({ data, handleEdit, handleDelete }) => (
    <table className="min-w-full border border-gray-200 bg-white rounded shadow">
        <thead className="bg-gray-300">
            <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Lokasi</th>
                <th className="px-4 py-2">Deskripsi</th>
                <th className="px-4 py-2">Status</th> 
                <th className="px-4 py-2">Tanggal</th> 
                <th className="px-4 py-2">Aksi</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={item._id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{item.location}</td>
                    <td className="border px-4 py-2">{item.description}</td>
                    <td className="border px-4 py-2">{item.status}</td>
                    <td className="border px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="border px-4 py-2 flex gap-2">
                        <Button
                            className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-300"
                            onClick={() => handleEdit(item)}
                        >
                            Edit
                        </Button>
                        <Button
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
                            onClick={() => handleDelete(item._id)}
                        >
                            Delete
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

Table.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default Table;