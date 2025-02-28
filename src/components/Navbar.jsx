import {
  LeftCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown } from "antd";
import useAuthStore from "../store/my-store";

function Navbar({ collapsed, setCollapsed }) {
  const authState = useAuthStore();

  return (
    <nav className="bg-slate-800 h-16 text-white flex justify-between items-center pr-4">
      <div className="flex gap-2 items-center">
        <Button
          type="link"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <div>Logo</div>
      </div>

      <Dropdown
        menu={{
          items: [
            {
              key: 1,
              label: "Sozlamalar",
              icon: <LeftCircleOutlined />,
            },
            {
              key: 2,
              label: "Profilim",
              icon: <LeftCircleOutlined />,
            },
            {
              key: 3,
              label: "Chiqish",
              icon: <LeftCircleOutlined />,
              danger: true,
              onClick: () => {
                useAuthStore.setState({
                  token: "",
                  user: null,
                });
                localStorage.removeItem("auth");
              },
            },
          ],
        }}
      >
        <div className="flex items-center gap-2">
          <Avatar
            size="large"
            icon={<UserOutlined />}
          />

          <div className="text-sm">
            <div>
              {authState.user.firstName} {authState.user.lastName}
            </div>
            <div>@{authState.user.username}</div>
          </div>
        </div>
      </Dropdown>
    </nav>
  );
}

export default Navbar;
