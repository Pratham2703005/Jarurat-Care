import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-xl font-bold">Jarurat Care</h1>
        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/patients">Patients</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
