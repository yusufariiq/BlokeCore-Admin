import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from  "../components/Layout";

function Dashboard() {
  return (
    <Router>
      <Layout>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
          <p>Select an option from the sidebar to get started.</p>
        </div>
      </Layout>
    </Router>
  );
}

export default Dashboard;

