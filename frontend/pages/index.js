import Navbar from "../components/Navbar";
import UsersTable from "../components/UsersTable";

export default function Home({ users }) {
  return (
    <div>
      <Navbar />
      <UsersTable users={users} />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:8080/users");
  let data = await res.json();
  let users = data.users;
  users = users.map((u,idx)=> ({...u, key: idx }))
  return {
    props: {
      users,
    },
  };
}
