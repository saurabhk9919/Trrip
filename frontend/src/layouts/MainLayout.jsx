import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function MainLayout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          Orbitra AI
        </Link>


        <div className="flex items-center gap-4">

          {user ? (

            <>
              <span className="font-medium text-gray-700">
                Hello, {user.name}
              </span>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>

          ) : (

            <>
              <Link
                to="/login"
                className="text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </nav>


      {/* Main Content */}
      <main className="p-8">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;