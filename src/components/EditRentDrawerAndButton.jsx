import { Button, Drawer, Form, Input, message, Select } from "antd";
import { useState } from "react";
import api from "../api/api";

function EditRentDrawerAndButton({ onFinish, isOpen, setIsOpen, rent }) {
  const [loading, setLoading] = useState(false);
  console.log(rent);

  return (
    <Drawer
      title={"Ijara o'zgartirish"}
      open={isOpen}
      closeIcon={null}
      onClose={() => {
        setIsOpen(false);
      }}
      destroyOnClose
    >
      <Form
        layout="vertical"
        initialValues={{
          ...rent,
          leasedAt: rent.leasedAt.slice(0, 10),
          returningDate: rent.returningDate.slice(0, 10),
        }}
        onFinish={(values) => {
          console.log(rent);

          console.log(values);

          setLoading(true);
          api
            .put(`/api/rents/${rent.id}`, values)
            .then((res) => {
              console.log(res.data);
              message.success("O'zgardi");
              setIsOpen(false);
              onFinish();
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
          label="Kitobxon"
          name={"userId"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={[]} />
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
          <Select />
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
          <Input type="date" />
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
  );
}

export default EditRentDrawerAndButton;
