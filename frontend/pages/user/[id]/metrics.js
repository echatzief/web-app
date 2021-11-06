import React from "react";
import Navbar from "../../../components/Navbar";
import { useRouter } from "next/router";
import MetricsTable from "../../../components/MetricsTable";

const UserMetrics = ({ metrics }) => {
  const router = useRouter();
  const { query } = router;
  const { id } = query;
  
  return (
    <div>
      <Navbar />
      <MetricsTable metrics={metrics.filter(m => m.userId == id )} />
    </div>
  );
};

export default UserMetrics;

export async function getStaticProps() {
  const res = await fetch("http://localhost:8080/metrics");
  let data = await res.json();
  let metrics = data.metrics;
  metrics = metrics.map((u, idx) => ({ ...u, key: idx }));
  return {
    props: {
      metrics,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:8080/users");
  let data = await res.json();
  let users = data.users;

  const paths = users.map((user) => ({
    params: { id: user.ID.toString() },
  }));

  return { paths, fallback: false };
}