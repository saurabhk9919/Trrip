import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600"
      >
        Orbitra AI
      </Link>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>

        <Link to="/login" className="hover:text-blue-600">
          Login
        </Link>

        <Link to="/register" className="hover:text-blue-600">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;