import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "APW design docs",
  description: "APW documentation",
  base: process.env.VITE_BASE_URL || "/",
  head: [["link", { rel: "icon", href: "https://travelist.jp/_nxtmp/images/sp/favicon-152.ico" }]],
  lastUpdated: true,
  vite: {
    server: {
      port: 5175,
    },
  },
  mermaid: {
    theme: "base",
    themeVariables: {
      fontFamily: "var(--vp-font-family-base)",
      fontSize: "14px",
      background: "#AAAAAA",
      primaryColor: "#FFF8F8",
      primaryBorderColor: "#FFE6E5",
      primaryTextColor: "#666666",
    },
  },
  themeConfig: {
    logo: "https://travelist.jp/_nxtmp/images/sp/favicon-152.ico",

    search: {
      provider: "local",
    },

    outline: {
      level: [2, 3],
    },

    sidebar: [
      {
        text: "Mở đầu",
        link: "/onboarding/",
      },
      {
        text: "Thiết kế tổng thể",
        items: [
          {
            text: "Giới thiệu",
            link: "/architecture/about",
          },
          {
            text: "Tổng quan hệ thống",
            link: "/architecture/overview",
          },
        ]
      },
      {
        text: "Tính năng",
        collapsed: true,
        items: [
          {
            text: "Trao đổi points",
            collapsed: true,
            items: [
              {
                text: "Paypay",
                link: "/architecture/features/exchange_points/paypay",
              },
            ]
          }
        ]
      },
      {
        text: "Mẫu tài liệu thiết kế",
        items: [
          {
            text: "Thiết kế cơ bản",
            link: "/onboarding/basic-design-format",
          },
          {
            text: "Thiết kế chi tiết sửa lỗi",
            link: "/onboarding/bugfix-design-format",
          },
        ],
      },
      {
        text: "Chức năng",
        collapsed: false,
        items: [
          {
            text: "Web",
            collapsed: true,
            items: [
            ],
          },
          {
            text: "Admin",
            collapsed: true,
            items: [
            ],
          },
          {
            text: "Mobile",
            collapsed: true,
            items: [
            ],
          },
        ],
      },
      {
        text: "Sửa lỗi",
        collapsed: false,
        items: [
          {
            text: "Web",
            collapsed: true,
            items: [
            ],
          },
          {
            text: "Admin",
            collapsed: true,
            items: [
            ],
          },
          {
            text: "Mobile",
            collapsed: true,
            items: [
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/tuanvh262-zigexn/apw_documents" },
    ],
  },
});
