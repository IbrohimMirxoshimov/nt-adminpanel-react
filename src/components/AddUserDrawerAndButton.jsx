import { Button, Drawer, Form, Input, InputNumber, message, Radio } from "antd";
import axios from "axios";
import { useState } from "react";
import useAuthStore from "../store/my-store";

function AddUserDrawerAndButton() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const authState = useAuthStore();
  const [loading, setLoading] = useState(false);
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
        title={"Kitobxon qo'shish"}
        open={isOpenDrawer}
        closeIcon={null}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        destroyOnClose
      >
        <Form
          onFinish={(values) => {
            setLoading(true);
            axios
              .post(
                `https://library.softly.uz/api/users`,
                { ...values, phone: values.phone.toString() },
                {
                  headers: {
                    Authorization: `Bearer ${authState.token}`,
                  },
                }
              )
              .then((res) => {
                console.log(res.data);
                setIsOpenDrawer(false);

                message.success("Qo'shildi");
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
              Qo'shish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default AddUserDrawerAndButton;
