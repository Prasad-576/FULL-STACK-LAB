import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Settings as SettingsIcon, User, MapPin, Key, Bell, Phone } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: {
    city: string;
    state: string;
    pincode: string;
    fullAddress: string;
  };
}

function Settings() {
  const { isLoggedIn, token } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    fullAddress: ''
  });

  useEffect(() => {
    if (isLoggedIn && token) {
      fetchProfile();
    }
  }, [isLoggedIn, token]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        setProfile(data.user);
        setFormData({
          name: data.user.name || '',
          phone: data.user.phone || '',
          city: data.user.address?.city || '',
          state: data.user.address?.state || '',
          pincode: data.user.address?.pincode || '',
          fullAddress: data.user.address?.fullAddress || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: {
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            fullAddress: formData.fullAddress
          }
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProfile(data.user);
        setEditMode(false);
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error occurred' });
    }
  };
  
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] px-4">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Access Denied</h2>
        <p className="text-gray-600">Please log in to view your settings.</p>
      </div>
    );
  }

  if (loading) {
     return <div className="py-20 text-center">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Account Settings</h1>
      
      {message && (
        <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Sidebar */}
        <div className="col-span-1 space-y-2">
          <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg">
            <User size={18} className="mr-3" />
            Profile Info
          </button>
          <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 transition-colors rounded-lg hover:bg-gray-50">
            <MapPin size={18} className="mr-3" />
            Addresses
          </button>
          <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 transition-colors rounded-lg hover:bg-gray-50">
            <Key size={18} className="mr-3" />
            Security
          </button>
        </div>

        {/* Content Area */}
        <div className="col-span-1 md:col-span-2">
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center text-xl font-semibold text-gray-800">
                <SettingsIcon className="mr-2 text-blue-600" size={24} />
                Profile Information
              </h2>
              {!editMode && (
                <button 
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                  Edit Profile
                </button>
              )}
            </div>
            
            {editMode ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address (Cannot be changed)</label>
                  <input
                    type="email"
                    disabled
                    value={profile?.email || ''}
                    className="block w-full px-4 py-2 mt-1 text-gray-500 bg-gray-100 border border-gray-300 rounded-lg sm:text-sm cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                     type="text"
                     value={formData.phone}
                     onChange={(e) => setFormData({...formData, phone: e.target.value})}
                     className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                     placeholder="+1 (555) 000-0000"
                  />
                </div>

                <h3 className="pt-4 text-lg font-medium text-gray-900 border-t">Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Full Address</label>
                    <input
                      type="text"
                      value={formData.fullAddress}
                      onChange={(e) => setFormData({...formData, fullAddress: e.target.value})}
                      className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Pincode / Zip</label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex pt-4 mt-8 space-x-3 border-t border-gray-200">
                  <button type="submit" className="px-6 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setEditMode(false)} className="px-6 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</label>
                    <div className="mt-1 font-medium text-gray-900">{profile?.name}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Email</label>
                    <div className="mt-1 font-medium text-gray-900">{profile?.email}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</label>
                    <div className="mt-1 font-medium text-gray-900">{profile?.phone || 'Not provided'}</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h3 className="mb-4 text-sm font-medium text-gray-900">Default Address</h3>
                  {profile?.address?.fullAddress ? (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-900">{profile.address.fullAddress}</p>
                      <p className="text-gray-600">{profile.address.city}, {profile.address.state} {profile.address.pincode}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No address provided yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
