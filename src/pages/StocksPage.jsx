import { message, Spin, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../store/my-store";
import {
  CheckCircleOutlined,
  CheckCircleTwoTone,
  CheckOutlined,
  CloseCircleOutlined,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import AddStockDrawerAndButton from "../components/AddStockDrawerAndButton";

function StocksPage() {
  const [stocksState, setStocksState] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const state = useAuthStore();
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  const [stock, setStock] = useState();
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://library.softly.uz/api/stocks", {
        params: {
          size: pageSize,
          page: currentPage,
        },
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        setStocksState(res.data);
      })
      .catch((e) => {
        console.error(e);

        message.error("Xatolik");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  if (!stocksState) {
    return <Spin />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Kitoblarim</h2>
        <AddStockDrawerAndButton />
      </div>

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
                    setStock(item);
                  }}
                >
                  {id}
                </div>
              );
            },
          },
          {
            key: "book",
            title: "Kitob",
            dataIndex: "book",
            render: (book) => {
              return (
                <p>
                  {book.id}. {book.name}
                </p>
              );
            },
          },
          {
            key: "busy",
            title: "Bandlik",
            dataIndex: "busy",
            render: (busy) => {
              return !busy ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              ) : (
                <CloseCircleTwoTone twoToneColor="#eb2f96" />
              );
            },
          },
        ]}
        dataSource={stocksState.items}
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          total: stocksState.totalCount,
        }}
        rowKey={"id"}
        onChange={(pagination) => {
          setCurrentPage(pagination.current);
        }}
      />
    </div>
  );
}

export default StocksPage;
