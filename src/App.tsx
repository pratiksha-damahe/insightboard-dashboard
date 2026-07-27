import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchCryptoData } from './services';
import type { CryptoData } from './services';

function App() {
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [search, setSearch] = useState('');
  const [coins, setCoins] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchCryptoData();
        setCoins(data);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadData();

    // Live update every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const chartData = coins.slice(0, 7).map((coin) => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price,
  }));

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
          placeholder="Search coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-md"
        />

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500 text-sm">Total Coins Tracked</p>
            <p className="text-2xl font-bold text-gray-800">{coins.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500 text-sm">Top Coin</p>
            <p className="text-2xl font-bold text-gray-800">
              {coins[0]?.name || '...'}
            </p>
          </div>
          {role === 'admin' && (
            <div className="bg-white rounded-lg shadow p-5 border-2 border-blue-400">
              <p className="text-gray-500 text-sm">Admin Only: Last Updated</p>
              <p className="text-lg font-bold text-gray-800">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow p-5 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Top 7 Coins — Live Prices (USD)
          </h2>
          {loading ? (
            <p className="text-gray-500">Loading chart...</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Coin List Table */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">All Coins</h2>
          {loading ? (
            <p className="text-gray-500">Loading coins...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="py-2">Coin</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">24h Change</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoins.map((coin) => (
                    <tr key={coin.id} className="border-b last:border-0">
                      <td className="py-3 flex items-center gap-2">
                        <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                        {coin.name}
                      </td>
                      <td className="py-3">${coin.current_price.toLocaleString()}</td>
                      <td
                        className={`py-3 font-medium ${
                          coin.price_change_percentage_24h >= 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;