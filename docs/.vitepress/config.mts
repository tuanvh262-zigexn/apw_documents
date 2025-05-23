import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "kpiee design docs",
  description: "kpiee documentation",
  head: [["link", { rel: "icon", href: "/logo.ico" }]],
  lastUpdated: true,
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
    logo: "/logo.ico",

    search: {
      provider: "local",
    },

    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'はじめに', link: '/onboarding/index.md' }
    // ],

    sidebar: [
      {
        text: "はじめに",
        link: "/onboarding/",
      },
      {
        text: '基本設計',
        link: '/basic_design/',
        items: [
          { text: '15期2Q', link: '/basic_design/15_2/' },
        ]
      },
      {
        text: '詳細設計',
        link: '/detail_design/',
        items: [
          { text: '15期2Q', link: '/detail_design/15_2/' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
