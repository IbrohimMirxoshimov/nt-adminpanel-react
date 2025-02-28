import {
  BookOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router";

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate();

  return (
    <Menu
      className="h-full text-left"
      style={{
        padding: 4,
        maxWidth: 180,
      }}
      defaultSelectedKeys={[location.pathname]}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      items={[
        {
          key: "/",
          label: <Link to="/">Home</Link>,
          icon: <HomeOutlined />,
        },
        {
          key: "/products",
          label: "Mahsulotlar",
          icon: <ProductOutlined />,
          onClick: () => {
            navigate("/products");
          },
        },
        {
          key: "/rents",
          label: <Link to="/rents">Ijaralar</Link>,
          icon: <FolderOpenOutlined />,
        },
        {
          key: "/users",
          label: <Link to="/users">Kitoboxnlar</Link>,
          icon: <UserOutlined />,
        },
        {
          key: "/stocks",
          label: <Link to="/stocks">Kitoblarim</Link>,
          icon: <BookOutlined />,
        },
      ]}
    />
  );
}
