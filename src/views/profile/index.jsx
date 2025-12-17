import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Descriptions, Space, Spin } from "antd";
import { useAuth } from "@/auth";
import { useI18n } from "@/i18n";
import { ProfileWrapper } from "./style";

const Profile = memo(() => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { initializing, user, isAuthed, logout } = useAuth();

  useEffect(() => {
    if (initializing) return;
    if (!isAuthed) navigate("/login");
  }, [initializing, isAuthed, navigate]);

  if (initializing) {
    return (
      <ProfileWrapper>
        <div className="center">
          <Spin />
        </div>
      </ProfileWrapper>
    );
  }

  if (!user) return null;

  return (
    <ProfileWrapper>
      <Card className="card" bordered={false}>
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <div className="title">{t("profile.title")}</div>
          <Button
            danger
            onClick={async () => {
              await logout();
              navigate("/home");
            }}
          >
            {t("profile.logout")}
          </Button>
        </Space>

        <Descriptions column={1} style={{ marginTop: 12 }}>
          <Descriptions.Item label={t("profile.username")}>{user.username}</Descriptions.Item>
          <Descriptions.Item label={t("profile.email")}>{user.email}</Descriptions.Item>
          <Descriptions.Item label={t("profile.userId")}>{user.id}</Descriptions.Item>
        </Descriptions>
      </Card>
    </ProfileWrapper>
  );
});

export default Profile;

