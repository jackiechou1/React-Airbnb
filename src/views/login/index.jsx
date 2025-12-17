import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Checkbox, Form, Input, Space, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useI18n } from "@/i18n";
import { useAuth } from "@/auth";
import { LoginWrapper } from "./style";

const Login = memo(() => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { login } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleFinish = async (values) => {
    setSubmitting(true);
    try {
      await login({ account: values.account, password: values.password });
      message.success(t("login.success"));
      navigate("/home");
    } catch (e) {
      message.error(e?.response?.data?.message || "登录失败");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LoginWrapper>
      <Card className="card" bordered={false}>
        <Typography.Title level={3} style={{ marginBottom: 4 }}>
          {t("login.title")}
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 16 }}>
          {t("login.subtitle")}
        </Typography.Paragraph>

        <Form
          layout="vertical"
          size="large"
          initialValues={{ remember: true }}
          onFinish={handleFinish}
          onFinishFailed={() => message.error(t("common.formCheckError"))}
        >
          <Form.Item
            label={t("login.accountLabel")}
            name="account"
            rules={[{ required: true, message: t("login.accountRequired") }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder={t("login.accountPlaceholder")}
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            label={t("login.passwordLabel")}
            name="password"
            rules={[{ required: true, message: t("login.passwordRequired") }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("login.passwordPlaceholder")}
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: 12 }}>
            <Checkbox>{t("login.remember")}</Checkbox>
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={submitting}>
            {t("login.submit")}
          </Button>

          <Space className="footer" size={12}>
            <Button type="link" onClick={() => navigate("/register")}>
              {t("login.noAccount")}
            </Button>
            <Button type="link" onClick={() => navigate("/home")}>
              {t("common.backHome")}
            </Button>
          </Space>
        </Form>
      </Card>
    </LoginWrapper>
  );
});

export default Login;
