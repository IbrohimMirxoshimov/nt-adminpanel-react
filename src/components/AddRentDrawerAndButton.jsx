import { Button, DatePicker, Drawer, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import useAuthStore from "../store/my-store";
import api from "../api/api";

function AddRentDrawerAndButton({ onFinish }) {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const authState = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    users: [],
    stocks: [],
  });

  useEffect(() => {
    api.get("/api/stocks").then((res) => {
      setData((data) => {
        return {
          ...data,
          stocks: res.data.items,
        };
      });
    });

    api.get("/api/users").then((res) => {
      setData((data) => {
        return {
          ...data,
          users: res.data.items,
        };
      });
    });
  }, []);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setIsOpenDrawer(true);
        }}
      >
        Qo'shish
      </Button>
      <Drawer
        title={"Ijara qo'shish"}
        open={isOpenDrawer}
        closeIcon={null}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log(values);

            // setLoading(true);
            // axios
            //   .post(
            //     `https://library.softly.uz/api/users`,
            //     { ...values, phone: values.phone.toString() },
            //     {
            //       headers: {
            //         Authorization: `Bearer ${authState.token}`,
            //       },
            //     }
            //   )
            //   .then((res) => {
            //     console.log(res.data);
            //     setIsOpenDrawer(false);

            //     message.success("Qo'shildi");

            //     onFinish();
            //   })
            //   .catch((e) => {
            //     console.error(e);
            //     message.error("Xatolik");
            //   })
            //   .finally(() => {
            //     setLoading(false);
            //   });
          }}
        >
          <Form.Item
            label="Kitobxon"
            name={"userId"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={data.users.map((user) => {
                return {
                  label: `${user.firstName} ${user.lastName}`,
                  value: user.id,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            label="Kitob zaxirasi"
            name={"stockId"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={data.stocks.map((stock) => {
                return {
                  label: stock.book.name,
                  value: stock.id,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            label="Topshirilgan sana"
            name={"leasedAt"}
            rules={[
              {
                required: true,
              },
            ]}
           
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="Qaytarilgan sana"
            name={"returningDate"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Qo'shish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default AddRentDrawerAndButton;
