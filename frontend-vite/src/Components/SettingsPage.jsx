import { useState } from 'react';

export default function SettingsPage() {
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // FormData for profile image
    const formData = new FormData();
    formData.append('username', username);
    formData.append('currentPassword', currentPassword);
    formData.append('newPassword', newPassword);
    formData.append('profilePic', profilePic);

    // Example fetch call to your backend
    fetch('/api/user/update-settings', {
      method: 'POST',
      body: formData,
      // Do not set Content-Type manually when using FormData
    })
    .then(res => res.json())
    .then(data => alert('Settings updated!'))
    .catch(err => console.error(err));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Account Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700">New Username</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full text-sm"
            onChange={handleProfilePicChange}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
