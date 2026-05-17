// StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem('userId');

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editPicture, setEditPicture] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/api/users/${loggedInUserId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setEditName(data.username);
        setEditBio(data.bio || '');
        setEditPicture(data.picture || '');
        localStorage.setItem('userName', data.username);
        if (data.picture) {
          localStorage.setItem('userPicture', data.picture);
        } else {
          localStorage.removeItem('userPicture');
        }
      });
  }, [loggedInUserId]);

  const handleSave = async () => {
    const res = await fetch(`http://localhost:3001/api/users/${loggedInUserId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: editName, bio: editBio, picture: editPicture })
    });
    if (res.ok) {
      setUser({ ...user, username: editName, bio: editBio, picture: editPicture });
      localStorage.setItem('userName', editName);
      localStorage.setItem('userPicture', editPicture);
      setIsEditing(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      const data = await res.json();
      setEditPicture(data.url);
    }
  };

  if (!user) return <div className="p-6 text-center">Loading profile...</div>;

  return (
    <div className="flex min-h-screen bg-transparent">

      {/* SIDEBAR */}
      <aside className="w-80 bg-white/40 backdrop-blur-md border-r p-6 flex flex-col items-center">
        <div
          className={`relative ${isEditing ? 'cursor-pointer group' : ''}`}
          onClick={() => isEditing && document.getElementById('profilePicInput').click()}
        >
          <Avatar
            name={user.username}
            picture={isEditing && editPicture ? editPicture : user.picture}
            size="lg"
            type="user"
            className={isEditing ? 'group-hover:opacity-70 transition' : ''}
          />
          {isEditing && (
            <>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-sm bg-black/50 text-white px-2 py-1 rounded">Change</span>
              </div>
              <input type="file" id="profilePicInput" className="hidden" accept="image/*" onChange={handleImageChange} />
            </>
          )}
        </div>

        <h2 className="text-2xl font-bold mt-4">{user.username}</h2>
        <p className="text-gray-500 text-sm mt-1">
          Student since {new Date(user.createdAt).toLocaleDateString()}
        </p>

        <div className="mt-6 w-full space-y-4">
          <div className="text-sm text-gray-600 space-y-3 w-full">
            <div>
              <label className="font-bold block mb-1">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-white text-gray-800"
                />
              ) : (
                <p>{user.username}</p>
              )}
            </div>

            <div>
              <label className="font-bold block mb-1">Email</label>
              <p>{user.email}</p>
            </div>

            <div>
              <label className="font-bold block mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="w-full px-3 py-2 border rounded-xl bg-white text-gray-800 text-sm"
                  rows={3}
                />
              ) : (
                <p className="text-gray-500 italic">{user.bio || 'No bio yet'}</p>
              )}
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full text-white py-2 rounded-lg transition"
              style={{ backgroundColor: '#03A07B' }}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="w-full text-white py-2 rounded-lg transition"
                style={{ backgroundColor: '#03A07B' }}
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </>
          )}

          <button
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 space-y-10">
        <h3 className="text-2xl font-bold">Welcome back, {user.username}!</h3>
        {/* schedule/lessons sections go here later */}
      </main>

    </div>
  );
}