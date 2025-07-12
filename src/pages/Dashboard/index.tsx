import Layout from "../../components/Layout";
import { useContext, useState } from "react";
import { ThemeContext } from "../../Context/ThemeProvider";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { type Qualification, type EditableSectionProps, type FieldType, type SingleRowProps } from "../types";
import { group_qualification, personalDetails, private_qualification } from "../static";
import { EditableTableSection } from "./QualificationTable";
import WeeklyScheduler from "./WeeklyScheduler";


const Dashboard = () => {
    const { isSideBarVisible } = useContext(ThemeContext);
    const [privateQualifications, setPrivateQualifications] = useState<Qualification[]>(private_qualification);
    const [groupQualifications, setGroupQualifications] = useState<Qualification[]>(group_qualification);

    return (
        <Layout>
            <Toaster position="top-right" />
            <div className="p-2 flex flex-col gap-4 bg-sky-50">
                <div className=" w-full">
                    <div className={`p-4 space-y-4 ${isSideBarVisible ? "bg-gray-200" : ""}`}>
                        <div className="flex justify-between items-center flex-wrap gap-4">
                            <div className="flex gap-2 items-center justify-center">
                                <h2 className="font-semibold text-xl">
                                    <span className="text-blue-500">Teachers</span> / <span>Jahir</span>
                                </h2>
                                <CgProfile className="w-6 h-6" />
                            </div>
                            <IoMdSettings className="w-6 h-6 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row lg:flex-row gap-4 lg:gap-10 ">
                    <div className="w-full flex flex-col gap-4">
                        <EditableSection
                            sectionKey="emails"
                            title="Details"
                            fields={[
                                { key: "name", label: "Name", value: personalDetails.name },
                                { key: "role", label: "Role", value: personalDetails.role },
                                { key: "date_of_birth", label: "Birth Date", value: personalDetails.date_of_birth }
                            ]}
                        />

                        <EditableTableSection
                            title="Private Qualifications"
                            data={privateQualifications}
                            onSave={(updated) => {
                                setPrivateQualifications(updated);
                            }}
                        />
                        <br className="mt-4" />
                        <EditableTableSection
                            title="Group Qualifications"
                            data={groupQualifications}
                            onSave={(updated) => {
                                setGroupQualifications(updated);
                            }}
                        />
                    </div>

                    <div className="w-full flex flex-col gap-4">
                        <EditableSection
                            title="Email"
                            sectionKey="emails"
                            fields={[{ key: "work", label: "Work", value: personalDetails.emails.work }]}
                        />

                        <EditableSection
                            title="Phone"
                            sectionKey="phone"
                            fields={[{ key: "home", label: "Home", value: personalDetails.phone.home }]}
                        />

                        <EditableSection
                            title="Address"
                            sectionKey="address"
                            fields={personalDetails.address.home.map((line, idx) => ({
                                key: `line_${idx}`,
                                label: `Line ${idx + 1}`,
                                value: line
                            }))}
                        />
                    </div>
                </div>

                <WeeklyScheduler />
            </div>
        </Layout>
    );
};


const EditableSection = ({ title, sectionKey, fields }: EditableSectionProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState<FieldType[]>(fields);
    const [originalData, setOriginalData] = useState<FieldType[]>(fields);

    const handleFieldChange = (index: number, value: string) => {
        const newData = [...data];
        newData[index].value = value;
        setData(newData);
    };

    const handleLabelChange = (index: number, label: string) => {
        const newData = [...data];
        newData[index].label = label;
        setData(newData);
    };


    const handleAddField = () => {
        setData([...data, { key: "", label: "", value: "" }]);
        setIsEditing(true);
    };

    const handleRemoveField = (index: number) => {
        const updated = [...data];
        updated.splice(index, 1);
        setData(updated);
    };


    const handleSave = () => {
        for (const row of data) {
            if (!row.label.trim() || !row.value.trim()) {
                toast.error("Both key and value are required");
                return;
            }
        }

        const updatedData = data.map((row) => ({
            ...row,
            key: row.label.trim().toLowerCase().replace(/\s+/g, "_"),
        }));

        setOriginalData(updatedData);
        setData(updatedData);
        setIsEditing(false);

        // Correctly assign based on sectionKey
        if (sectionKey === "address") {
            personalDetails.address.home = updatedData.map((d) => d.value);
        } else if (sectionKey === "emails" || sectionKey === "phone") {
            const newSection: Record<string, string> = {};
            updatedData.forEach((d) => {
                newSection[d.key] = d.value;
            });
            personalDetails[sectionKey] = newSection;
        } else if (sectionKey === "name" || sectionKey === "role" || sectionKey === "date_of_birth") {
            // Assign string directly (only one field expected)
            if (updatedData.length > 0) {
                personalDetails[sectionKey] = updatedData[0].value;
            }
        }
    };


    const handleCancel = () => {
        for (const row of data) {
            if (!row.key.trim() || !row.value.trim()) {
                toast.error("Both key and value are required");
                return;
            }
        }
        setData(originalData);
        setIsEditing(false);
    };

    return (
        <div className="p-2 bg-white w-full space-y-2 rounded">
            <div className="flex justify-between items-center">
                <p className="py-1 font-semibold">{title}</p>
                <div className="flex gap-2">
                    <FaPlus className="cursor-pointer" onClick={handleAddField} />
                    <FaPen className="cursor-pointer" onClick={() => setIsEditing(true)} />
                </div>
            </div>

            {data.map((field, idx) => (
                <SingleRow
                    key={field.key + idx}
                    title={field.label}
                    value={field.value}
                    isEditing={isEditing}
                    onLabelChange={(val) => handleLabelChange(idx, val)}
                    onChange={(val) => handleFieldChange(idx, val)}
                    onRemove={() => handleRemoveField(idx)}
                />
            ))}

            {isEditing && (
                <div className="flex justify-end gap-4 pt-2">
                    <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={handleCancel}>
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

const SingleRow = ({ title, value, isEditing, onChange, onLabelChange, onRemove }: SingleRowProps) => {
    return (
        <>
            <hr className="text-neutral-200" />
            <div className="flex w-full gap-4 items-start">
                <div className="flex justify-end w-1/4 font-bold">
                    {isEditing ? (
                        <input
                            className="border border-gray-300 rounded px-2 py-1 w-full"
                            placeholder="Key/Label"
                            value={title}
                            onChange={(e) => onLabelChange(e.target.value)}
                        />
                    ) : (
                        <p >{title}</p>
                    )}
                </div>
                <div className="flex justify-start w-3/4  relative">
                    {isEditing ? (
                        <>
                            <input
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                                placeholder="Value"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                            />
                            <FaTrash
                                className="absolute right-2 top-2 text-red-500 cursor-pointer"
                                onClick={onRemove}
                            />
                        </>
                    ) : (
                        <p className="text-gray-800">{value}</p>
                    )}
                </div>
            </div>
        </>

    );
};

export default Dashboard;
