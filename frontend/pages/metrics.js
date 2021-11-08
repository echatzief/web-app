import MetricsCreateForm from "../components/MetricsCreateForm";
import Navbar from "../components/Navbar";

export default function Metrics({ users }) {
  return (
    <div>
      <Navbar />
      <MetricsCreateForm users={users} />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://192.168.1.113:8080/users");
  let data = await res.json();
  let users = data.users;
  users = users.map((u, idx) => ({ ...u, key: idx }));
  return {
    props: {
      users,
    },
  };
}
