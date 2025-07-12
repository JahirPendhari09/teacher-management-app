import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const generateTimeSlots = () => {
    const slots = [];
    let hour = 7;
    let minute = 30;
    while (hour < 17 || (hour === 17 && minute === 0)) {
        const t = `${hour % 12 === 0 ? 12 : hour % 12}:${minute === 0 ? "00" : "30"} ${hour >= 12 ? "PM" : "AM"}`;
        slots.push(t);
        minute += 30;
        if (minute >= 60) {
            hour++;
            minute = 0;
        }
    }
    return slots;
};

const timeSlots = generateTimeSlots();

export default function WeeklyGridScheduler() {
    const [gridData, setGridData] = useState<{ [day: string]: { [time: string]: string } }>({});
    const [editing, setEditing] = useState<{ day: string; time: string; value: string } | null>(null);

    const handleCellClick = (day: string, time: string) => {
        const existing = gridData[day]?.[time] || "";
        setEditing({ day, time, value: existing });
    };

    const handleSave = () => {
        if (!editing) return;
        const updated = { ...gridData };
        if (!updated[editing.day]) updated[editing.day] = {};
        updated[editing.day][editing.time] = editing.value;

        setGridData(updated);
        setEditing(null);
        toast.success("Saved!");
    };

    return (
        <div className="p-4 overflow-auto bg-white overflow-scroll">
            <Toaster position="top-right" />
            <h2 className="text-xl font-bold mb-4">Weekly Scheduler</h2>

            {/* Grid header */}
            <div className="grid" style={{ gridTemplateColumns: `120px repeat(7, 1fr)` }}>
                <div className="bg-gray-100 text-center pt-2 font-bold">Day/Time</div>
                {days.map((day) => (
                    <div key={day} className="p-2 font-semibold text-center bg-gray-100 ">
                        {day}
                    </div>
                ))}

                {timeSlots.map((time) => (
                    <>
                        <div key={`time-${time}`} className="p-2 border-b border-white text-sm bg-neutral-200">
                            {time}
                        </div>
                        {days.map((day) => (
                            <div
                                key={`${day}-${time}`}
                                className={`
                    border-b border-white bg-neutral-200  min-h-[60px] p-2 text-sm cursor-pointer hover:bg-blue-200
                    ${day === 'Friday' || day === 'Tuesday' ? 'bg-neutral-300' : ''}
                `}
                                onClick={() => handleCellClick(day, time)}
                            >
                                {gridData[day]?.[time] || ""}
                            </div>
                        ))}
                    </>
                ))}
            </div>

            {editing && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded shadow-lg w-[90%] max-w-md">
                        <h3 className="text-lg font-semibold mb-2">
                            Edit [{editing.day} - {editing.time}]
                        </h3>
                        <textarea
                            className="w-full border rounded p-2 mb-4"
                            rows={4}
                            value={editing.value}
                            onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                            placeholder="Enter comment or note..."
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-500 text-white px-4 py-1 rounded"
                                onClick={() => setEditing(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-1 rounded"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
