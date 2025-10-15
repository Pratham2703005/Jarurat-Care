import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, addPatient } from "../redux/features/patientStore";
import "../styles/patients.css";

const Patients = () => {
  const dispatch = useDispatch();
  const { data: patients, status, error } = useSelector((s) => s.patients);

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (status === "idle") dispatch(fetchPatients());
  }, [status, dispatch]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter((p) => p.name.toLowerCase().includes(q));
  }, [patients, query]);

  function openDetails(p) {
    setSelected(p);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setSelected(null);
  }

  
function validateForm() {
  const newErrors = {};
  if (!form.name.trim()) newErrors.name = "Name is required.";
  if (!form.age.trim() || isNaN(form.age) || form.age <= 0)
    newErrors.age = "Enter a valid age.";
  if (!form.phone.trim() || !/^\d{10}$/.test(form.phone))
    newErrors.phone = "Phone must be 10 digits.";
  if (
    !form.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  )
    newErrors.email = "Enter a valid email address.";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

function handleAdd(e) {
  e.preventDefault();
  if (!validateForm()) return;

  const newPatient = {
    id: Date.now(),
    name: form.name,
    age: form.age,
    phone: form.phone,
    email: form.email,
    address: { city: "N/A" },
  };

  dispatch(addPatient(newPatient));
  setForm({ name: "", age: "", phone: "", email: "" });
  setErrors({});
}


  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h2 className="text-2xl font-semibold">Patients</h2>
        <div className="flex gap-2 items-center">
          <input
            aria-label="Search patients"
            placeholder="Search by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-2 border rounded w-64"
          />
        </div>
      </div>

      <section className="mb-6">
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
  <div>
    <input
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
      placeholder="Name"
      className="px-3 py-2 border rounded w-full"
    />
    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
  </div>

  <div>
    <input
      value={form.age}
      onChange={(e) => setForm({ ...form, age: e.target.value })}
      placeholder="Age"
      className="px-3 py-2 border rounded w-full"
    />
    {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
  </div>

  <div>
    <input
      value={form.phone}
      onChange={(e) => setForm({ ...form, phone: e.target.value })}
      placeholder="Phone"
      className="px-3 py-2 border rounded w-full"
    />
    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
  </div>

  <div>
    <input
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
      placeholder="Email"
      className="px-3 py-2 border rounded w-full"
    />
    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-2"
    >
      Add
    </button>
  </div>
</form>

      </section>

      <section>
        {status === "loading" && <p>Loading patients…</p>}
        {status === "failed" && <p className="text-red-500">Error: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <article key={p.id} className="patient-card">
              <h3 className="text-lg font-medium">{p.name}</h3>
              <p className="text-sm text-gray-800">Age: {p.age ?? (p.username ? Math.floor(20 + (p.id % 30)) : "—")}</p>
              <p className="text-sm text-gray-800">Contact: {p.phone ?? p.email}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => openDetails(p)} className="px-3 py-1 bg-gray-800 hover:bg-gray-950 rounded text-sm text-white hover:text-gray-200">View Details</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {showModal && selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-2xl max-w-2xl w-full p-6 shadow-lg">
            <header className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">{selected.name}</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-200">✕</button>
            </header>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* 🟢 Left Side: Image */}
              <div className="flex-shrink-0">
                <img
                  src={selected.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt={selected.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                />
              </div>

              {/* 🔵 Right Side: Details */}
              <div className="flex-1 space-y-3 text-sm md:text-base w-full">
                <div className="flex justify-between"><span className="font-medium">Age</span><span>{selected.age ?? (selected.username ? Math.floor(20 + (selected.id % 30)) : "—")}</span></div>
                <div className="flex justify-between"><span className="font-medium">Phone</span><span>{selected.phone ?? "—"}</span></div>
                <div className="flex justify-between"><span className="font-medium">Email</span><span>{selected.email ?? "—"}</span></div>
                <div className="flex justify-between"><span className="font-medium">City</span><span>{selected.address?.city ?? "—"}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Patients;
