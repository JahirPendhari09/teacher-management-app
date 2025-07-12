import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from "react";
import type { EditableTableProps, Qualification } from "../types";

export const EditableTableSection = ({ title, data, onSave }: EditableTableProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tableData, setTableData] = useState<Qualification[]>(data);
    const [originalData, setOriginalData] = useState<Qualification[]>(data);

    const handleFieldChange = (index: number, field: keyof Qualification, value: string) => {
        const updated = [...tableData];
        updated[index][field] = value;
        setTableData(updated);
    };

    const handleAddRow = () => {
        setTableData([...tableData, { name: "", rate: "" }]);
        setIsEditing(true);
    };

    const handleRemoveRow = (index: number) => {
        const updated = [...tableData];
        updated.splice(index, 1);
        setTableData(updated);
    };

    const handleSave = () => {
        for (const row of tableData) {
            if (!row.name.trim() || !row.rate.trim()) {
                toast.error("Both Name and Rate are required");
                return;
            }
        }
        onSave(tableData);
        setOriginalData(tableData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTableData(originalData);
        setIsEditing(false);
    };

    return (
        <div className="bg-white p-4 rounded-md w-full space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{title}</h3>
                <div className="flex gap-2">
                    <FaPlus className="cursor-pointer" onClick={handleAddRow} />
                    <FaPen className="cursor-pointer" onClick={() => setIsEditing(true)} />
                </div>
            </div>
            <table className="w-full table-auto text-sm border-collapse">
                <thead>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-2 w-2/3">Name</th>
                        <th className="text-center p-2 w-1/3">Rate | $(hr)</th>
                        {isEditing && <th className="w-10"></th>}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, idx) => (
                        <tr key={row.name} className="border-t border-gray-300">
                            <td className="p-1 w-2/3 flex ">
                                {isEditing ? (
                                    <input
                                        className="border border-gray-300 rounded px-2 py-1 w-full"
                                        value={row.name}
                                        onChange={(e) => handleFieldChange(idx, "name", e.target.value)}
                                    />
                                ) : (
                                    <span>{row.name}</span>
                                )}
                            </td>
                            <td className="p-1">
                                {isEditing ? (
                                    <input
                                        className="border border-gray-300 rounded px-2 py-1 w-full"
                                        value={row.rate}
                                        onChange={(e) => handleFieldChange(idx, "rate", e.target.value)}
                                    />
                                ) : (
                                    <span>{row.rate}</span>
                                )}
                            </td>
                            {isEditing && (
                                <td className="p-1 text-center">
                                    <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleRemoveRow(idx)} />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
                {tableData.length === 0 && <div className="text-center p-2"> No data found.</div>}
            </table>
            {isEditing && (
                <div className="flex justify-end gap-4 mt-2">
                    <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleSave}>
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};
