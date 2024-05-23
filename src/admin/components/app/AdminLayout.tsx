import React from "react";
import {
  DashboardOutlined,
  FileImageOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  CustomerServiceOutlined,
  BookOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Typography, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "/admin/manager",
    icon: React.createElement(DashboardOutlined),
    label: `Dolandyryş panely`,
  },
  {
    key: "file",
    icon: React.createElement(FileImageOutlined),
    label: `Saýt faýllary`,
  },
  {
    key: "home",
    icon: React.createElement(HomeOutlined),
    label: `Baş sahypa`,
  },
  {
    key: "about",
    icon: React.createElement(InfoCircleOutlined),
    label: `Biz barada`,
  },
  {
    key: "service",
    icon: React.createElement(CustomerServiceOutlined),
    label: `Hyzmatlarymyz`,
  },
  {
    key: "portfolia",
    icon: React.createElement(BookOutlined),
    label: `Portfolia`,
  },
  {
    key: "other",
    icon: React.createElement(SettingOutlined),
    label: `Sazlamalar`,
  },
];

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: "center",
            paddingTop: "12px",
            paddingBottom: "12px",
          }}
        >
          <img
            src="/images/logo.png"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
          <Typography
            style={{
              color: "white",
              fontSize: "22px",
            }}
          >
            Admin
          </Typography>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/admin/manager"]}
          items={items}
          onSelect={(e) => {
            navigate(e.key);
          }}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          @shageldi-dev ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
