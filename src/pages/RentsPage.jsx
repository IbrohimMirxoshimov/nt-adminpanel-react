import { message, Switch, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../api/api";
import AddRentDrawerAndButton from "../components/AddRentDrawerAndButton";
import EditRentDrawerAndButton from "../components/EditRentDrawerAndButton";

function RentsPage() {
  const [rents, setRents] = useState();
  const [books, setBooks] = useState();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [rent, setRent] = useState();

  function fetchRents() {
    api
      .get("/api/rents", {
        params: {
          size: 10,
          page: 1,
        },
      })
      .then((res) => {
        // console.log(res.data.items);

        const books_ids = res.data.items.map((item) => {
          return item.stock.bookId;
        });

        api
          .get("/api/books", {
            params: {
              id: books_ids,
            },
          })
          .then((res) => {
            setBooks(res.data.items);
          });

        // bookids [1,2,3,4]
        setRents(res.data.items);
      })
      .catch((e) => {
        console.error(e);

        message.error("Xatolik");
      });
  }
  useEffect(() => {
    fetchRents();
  }, []);

  return (
    <div className="w-full">
      <h2>Ijaralar</h2>
      <AddRentDrawerAndButton />
      <EditRentDrawerAndButton
        rent={rent}
        isOpen={isOpenDrawer}
        setIsOpen={setIsOpenDrawer}
        onFinish={() => {
          fetchRents();
        }}
      />
      <Table
        scroll={{
          x: 1000,
        }}
        size="middle"
        className="w-full"
        bordered
        loading={rents ? false : true}
        columns={[
          {
            key: "id",
            title: "Raqami",
            dataIndex: "id",
            render: (id, item) => {
              return (
                <div
                  onClick={() => {
                    setIsOpenDrawer(true);
                    setRent(item);
                    console.log(item);
                  }}
                >
                  {id}
                </div>
              );
            },
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
          {
            key: "stock",
            title: "Zaxira kitob",
            dataIndex: "stock",
            render: (item) => {
              return (
                <ZaxiraKitobKatagi
                  stock={item}
                  books={books}
                />
              );
            },
          },
        ]}
        dataSource={rents}
      />
    </div>
  );
}

function ZaxiraKitobKatagi({ stock, books }) {
  const book = books?.find((item) => {
    return item.id === stock.bookId;
  });

  return (
    <div>
      {stock.id}/{stock.bookId} {book?.name}
    </div>
  );
}

export default RentsPage;
