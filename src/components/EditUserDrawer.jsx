import { Button, Drawer, Form, Input, InputNumber, message, Radio } from "antd";
import axios from "axios";
import { useState } from "react";
import useAuthStore from "../store/my-store";

function EditUserDrawer({ user, setUser }) {
  const authState = useAuthStore();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Drawer
        title={"Kitobxon o'zgartirish"}
        open={user ? true : false}
        closeIcon={null}
        onClose={() => {
          setUser(null);
        }}
        destroyOnClose
      >
        <Form
          initialValues={user}
          onFinish={(values) => {
            setLoading(true);
            axios
              .put(
                `https://library.softly.uz/api/users/${user.id}`,
                { ...values, phone: values.phone.toString() },
                {
                  headers: {
                    Authorization: `Bearer ${authState.token}`,
                  },
                }
              )
              .then((res) => {
                console.log(res.data);
                setUser(null);

                message.success("O'zgardi");
              })
              .catch((e) => {
                console.error(e);
                message.error("Xatolik");
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          <Form.Item
            label="Ism"
            name={"firstName"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Familiya"
            name={"lastName"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Telefon raqam"
            name={"phone"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Jinsi"
            name={"gender"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group
              block
              options={[
                {
                  label: "Erkak",
                  value: "male",
                },
                {
                  label: "Ayol",
                  value: "female",
                },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default EditUserDrawer;
