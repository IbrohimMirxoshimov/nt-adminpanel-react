import { message, Spin, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../store/my-store";
import AddUserDrawerAndButton from "../components/AddUserDrawerAndButton";
import EditUserDrawer from "../components/EditUserDrawer";

function UsersPage() {
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const state = useAuthStore();
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  const [user, setUser] = useState();

  function fetchUsers() {
    setLoading(true);
    axios
      .get("https://library.softly.uz/api/users", {
        params: {
          size: pageSize,
          page: currentPage,
        },
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => {
        console.error(e);

        message.error("Xatolik");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  if (!users) {
    return <Spin />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Kitobxonlar</h2>

        <AddUserDrawerAndButton onFinish={fetchUsers} />
      </div>
      <EditUserDrawer
        onFinish={fetchUsers}
        user={user}
        setUser={setUser}
      />
      <Table
        bordered
        loading={loading}
        columns={[
          {
            key: "id",
            title: "Raqami",
            dataIndex: "id",
            render: (id, item) => {
              return (
                <div
                  onClick={() => {
                    setUser(item);
                  }}
                >
                  {id}
                </div>
              );
            },
          },
          {
            key: "firstName",
            title: "Ism",
            dataIndex: "firstName",
          },
          {
            key: "lastName",
            title: "Familiya",
            dataIndex: "lastName",
          },
        ]}
        rowKey={"id"}
        dataSource={users.items}
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          total: users.totalCount,
        }}
        onChange={(pagination) => {
          setCurrentPage(pagination.current);
        }}
      />
    </div>
  );
}

export default UsersPage;
