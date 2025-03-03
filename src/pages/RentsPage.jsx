import { message, Switch, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../api/api";

function RentsPage() {
  const [rents, setRents] = useState();

  useEffect(() => {
    api
      .get("/api/rents", {
        params: {
          size: 20,
          page: 1,
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setRents(res.data.items);
      })
      .catch((e) => {
        console.error(e);

        message.error("Xatolik");
      });
  }, []);

  return (
    <div>
      <h2>Ijaralar</h2>

      <Table
        bordered
        loading={rents ? false : true}
        columns={[
          {
            key: "id",
            title: "Raqami",
            dataIndex: "id",
          },
          {
            key: "leasedAt",
            title: "Berilgan sana",
            dataIndex: "leasedAt",
            render: (value) => {
              return new Date(value).toLocaleString("ru", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
            },
          },
          {
            key: "returnedAt",
            title: "Qaytdi",
            dataIndex: "returnedAt",
            render: (value) => {
              return (
                <Switch
                  onChange={(checked) => {
                    if (checked) {
                      // apiga zapros berish kerak
                      // https://library.softly.uz/api/rents/52902/return
                      // PUT
                    }
                  }}
                  checked={value ? true : false}
                />
              );
            },
          },

          {
            key: "user",
            title: "Kitobxon",
            dataIndex: "user",
            render: (item) => {
              return (
                <div>
                  {item.id}. {item.firstName}
                </div>
              );
            },
          },
        ]}
        dataSource={rents}
      />
    </div>
  );
}

export default RentsPage;
