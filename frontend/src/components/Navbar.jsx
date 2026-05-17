import React from "react";
import { Link } from "react-router-dom";
import Avatar from '../components/Avatar';

export default function Navbar() {
  const userName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('userRole');
  const userPicture = localStorage.getItem('userPicture');
  const isLoggedIn = !!userName;
  const isAdmin = userRole === 'admin';

  return (
    <nav className="font-bold px-4 py-3 flex justify-between items-center border-b bg-teal-700 backdrop-blur-md">
      {/* Admin icon - far left */}
      {isAdmin && (
        <div className="relative group">
          <Link to="/admin">
            <div className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer" style={{ backgroundColor: '#03A07B' }}>
              <span className="text-white text-sm font-bold">A</span>
            </div>
          </Link>
          <span className="absolute top-10 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            Admin Dashboard
          </span>
        </div>
      )}

      {/* Center links */}
      <div className="flex gap-8 flex-1 justify-center">
        <Link to="/" className="hover:text-[#03A07B] transition-colors">Home</Link>
        <Link to="/login" className="hover:text-[#03A07B] transition-colors">Login / Sign Up</Link>
        <Link to="/schedule" className="hover:text-[#03A07B] transition-colors">Schedule</Link>
        <Link to="/about" className="hover:text-[#03A07B] transition-colors">About</Link>
      </div>

      {/* Avatar - far right */}
      {isLoggedIn && (
        <div className="relative group">
          <Link to="/student">
            <Avatar name={userName} picture={userPicture} size="sm" />
          </Link>
          <span className="absolute top-10 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            My Dashboard
          </span>
        </div>
      )}
    </nav>
  );
}