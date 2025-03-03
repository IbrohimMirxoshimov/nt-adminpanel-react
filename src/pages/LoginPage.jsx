import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import useAuthStore from "../store/my-store";
import api from "../api/api";

function LoginPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="shadow-lg w-96 shadow-gray-400">
        <Form
          layout="vertical"
          initialValues={{
            username: "lib2",
            password: "lib22",
          }}
          onFinish={(values) => {
            console.log(values);
            setLoading(true);

            api
              .post("/auth/signin", values)
              .then((res) => {
                console.log(res.data);
                api.defaults.headers.Authorization = `Bearer ${res.data.token}`;
                useAuthStore.setState({
                  token: res.data.token,
                  user: res.data.user,
                });
                setLoading(false);

                localStorage.setItem("auth", JSON.stringify(res.data));

                message.success("Uraaa!");
              })
              .catch((e) => {
                console.error(e);
                setLoading(false);

                message.error("Xatolik");
              });
          }}
        >
          <Form.Item
            label="Login"
            name={"username"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name={"password"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginPage;
