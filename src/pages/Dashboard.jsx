import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, ShoppingCart, TrendingUp, WalletMinimal } from 'lucide-react';
import { backendUrl } from '../App';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    revenue: 0,
    growth: 0
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch stats from your Express backend
    const fetchStats = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/stats`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    // Fetch chart data from your Express backend
    const fetchChartData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/chart-data`);
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchStats();
    fetchChartData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Users className="w-8 h-8" />} title="Total Users" value={stats.users} />
        <StatCard icon={<ShoppingCart className="w-8 h-8" />} title="Total Orders" value={stats.orders} />
        <StatCard icon={<WalletMinimal className="w-8 h-8" />} title="Revenue" value={`Rp ${stats.revenue.toLocaleString()}`} />
        <StatCard icon={<TrendingUp className="w-8 h-8" />} title="Growth" value={`${stats.growth}%`} />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#C9080E" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
    <div className="mr-4 text-primary">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default Dashboard;