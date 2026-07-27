import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CryptoData {
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

function App() {
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [search, setSearch] = useState('');

  const dummyData = [
    { name: 'Mon', price: 4000 },
    { name: 'Tue', price: 3000 },
    { name: 'Wed', price: 5000 },
    { name: 'Thu', price: 4780 },
    { name: 'Fri', price: 5890 },
    { name: 'Sat', price: 4390 },
    { name: 'Sun', price: 6490 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">InsightBoard</h1>
        <div className="flex items-center gap-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
            className="border rounded-md px-3 py-1 text-sm"
          >
            <option value="user">User View</option>
            <option value="admin">Admin View</option>
          </select>
        </div>
      </nav>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-md"
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-800">$45,231</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500 text-sm">Active Users</p>
            <p className="text-2xl font-bold text-gray-800">2,350</p>
          </div>
          {role === 'admin' && (
            <div className="bg-white rounded-lg shadow p-5 border-2 border-blue-400">
              <p className="text-gray-500 text-sm">Admin Only: Server Load</p>
              <p className="text-2xl font-bold text-gray-800">67%</p>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Weekly Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dummyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;