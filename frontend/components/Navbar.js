import { PageHeader, Button } from "antd";
import { PlusCircleFilled } from '@ant-design/icons';
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  return (
    <PageHeader
      className="site-page-header"
      title={
        <Button type="text" shape="round" onClick={() => router.push("/")}>
          <h3>Metrics Dashboard</h3>
        </Button>
      }
      subTitle={
        <div>
          <Button
            type="text"
            shape="round"
            icon={<PlusCircleFilled />}
            onClick={() => router.push("/metrics")}
          >
            Metric
          </Button>
          <Button
            type="text"
            shape="round"
            icon={<PlusCircleFilled />}
            onClick={() => router.push("/user/add")}
          >
            User
          </Button>
        </div>
      }
    />
  );
}

export default Navbar;