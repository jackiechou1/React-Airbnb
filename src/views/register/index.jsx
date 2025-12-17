import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Checkbox, Form, Input, Space, Typography, message } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useI18n } from "@/i18n";
import { registerAccount } from "@/services/modules/auth";
import { RegisterWrapper } from "./style";

const Register = memo(() => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [submitting, setSubmitting] = useState(false);

  const handleFinish = async (values) => {
    setSubmitting(true);
    try {
      await registerAccount({ email: values.email, username: values.username, password: values.password });
      message.success(t("register.success"));
      navigate("/login");
    } catch (e) {
      message.error(e?.response?.data?.message || "注册失败");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RegisterWrapper>
      <Card className="card" bordered={false}>
        <Typography.Title level={3} style={{ marginBottom: 4 }}>
          {t("register.title")}
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 16 }}>
          {t("register.subtitle")}
        </Typography.Paragraph>

        <Form
          layout="vertical"
          size="large"
          onFinish={handleFinish}
          onFinishFailed={() => message.error(t("common.formCheckError"))}
        >
          <Form.Item
            label={t("register.emailLabel")}
            name="email"
            rules={[
              { required: true, message: t("register.emailRequired") },
              { type: "email", message: t("register.emailInvalid") },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder={t("register.emailPlaceholder")}
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            label={t("register.usernameLabel")}
            name="username"
            rules={[{ required: true, message: t("register.usernameRequired") }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder={t("register.usernamePlaceholder")}
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            label={t("register.passwordLabel")}
            name="password"
            rules={[
              { required: true, message: t("register.passwordRequired") },
              { min: 8, message: t("register.passwordMin") },
              { pattern: /^(?=.*[A-Za-z])(?=.*\d).+$/, message: t("register.passwordPattern") },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("register.passwordPlaceholder")}
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            label={t("register.confirmPasswordLabel")}
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: t("register.confirmRequired") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) return Promise.resolve();
                  return Promise.reject(new Error(t("register.confirmMismatch")));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("register.confirmPasswordPlaceholder")}
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error(t("register.agreementRequired"))),
              },
            ]}
            style={{ marginBottom: 12 }}
          >
            <Checkbox>{t("register.agreement")}</Checkbox>
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={submitting}>
            {t("register.submit")}
          </Button>

          <Space className="footer" size={12}>
            <Button type="link" onClick={() => navigate("/login")}>
              {t("register.haveAccount")}
            </Button>
            <Button type="link" onClick={() => navigate("/home")}>
              {t("common.backHome")}
            </Button>
          </Space>
        </Form>
      </Card>
    </RegisterWrapper>
  );
});

export default Register;
