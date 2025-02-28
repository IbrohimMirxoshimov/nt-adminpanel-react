import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ProductsPage() {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios
      .get("https://67458ca9512ddbd807f88427.mockapi.io/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((e) => {
        console.error(e);

        message.error("Xatolik");
      });
  }, []);

  if (!products) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <div className="text-2xl font-bold mb-2">Products page</div>

      <Table
        bordered
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "Nomi",
            dataIndex: "name",
            render: (name) => {
              return <div>{name.toUpperCase()}</div>;
            },
          },
          {
            title: "Rasm",
            dataIndex: "image",
            render: (image) => {
              return (
                <img
                  className="h-10"
                  src={image}
                />
              );
            },
          },
        ]}
        dataSource={products}
      />
    </div>
  );
}

export default ProductsPage;
