import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";

export default function Home() {
    return (
      <Content className="dark-theme">
        <Outlet/>
      </Content>
    )
  }