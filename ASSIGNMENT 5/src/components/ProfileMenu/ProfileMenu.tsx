import React, { useState, useRef, useEffect } from 'react';
import { User, LogIn, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close when pressing ESC
  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleOptionClick = (path?: string, action?: () => void) => {
    setIsOpen(false);
    if (action) {
      action();
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 text-white transition-colors rounded-full hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="User Profile"
      >
        <User size={24} />
      </button>

      {isOpen && (
        <div className="absolute right-0 w-48 py-2 mt-2 bg-white border border-gray-100 rounded-lg shadow-xl top-full ring-1 ring-black ring-opacity-5 animate-in fade-in slide-in-from-top-2 duration-200">
          {!isLoggedIn ? (
            <button
              onClick={() => handleOptionClick('/auth')}
              className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
            >
              <LogIn size={16} className="mr-2" />
              Login / Sign Up
            </button>
          ) : (
            <>
              <button
                onClick={() => handleOptionClick('/settings')}
                className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600"
              >
                <Settings size={16} className="mr-2" />
                Settings
              </button>
              <button
                onClick={() => handleOptionClick(undefined, logout)}
                className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
