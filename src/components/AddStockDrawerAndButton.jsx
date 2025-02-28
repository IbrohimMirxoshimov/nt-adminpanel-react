import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
} from "antd";
import axios from "axios";
import { useState } from "react";
import useAuthStore from "../store/my-store";

function AddStockDrawerAndButton() {
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
        title={"Kitob qo'shish"}
        open={isOpenDrawer}
        closeIcon={null}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        destroyOnClose
      >
        <Form
          onFinish={(values) => {
            // setLoading(true);
            console.log(values);

            // axios
            //   .post(`https://library.softly.uz/api/stocks`, values, {
            //     headers: {
            //       Authorization: `Bearer ${authState.token}`,
            //     },
            //   })
            //   .then((res) => {
            //     console.log(res.data);
            //     setIsOpenDrawer(false);

            //     message.success("Qo'shildi");
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
            label="Kitob"
            name={"bookId"}
          >
            <Select
              options={[
                {
                  label: "Sohilsiz dengiz",
                  value: 18,
                },
                {
                  label: "Jangchi",
                  value: 353,
                },
                {
                  label: "Muqaddima",
                  value: 12,
                },
              ]}
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

export default AddStockDrawerAndButton;
