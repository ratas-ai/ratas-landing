// Localized UI strings for the landing home page.
//
// Path-based SSG: "/" prerenders the English page and "/vi" the Vietnamese one.
// Both pages render the SAME components, so instead of duplicating markup per
// language we keep one component tree and pass it the active `locale`. Each
// component reads strings[locale] at build time, producing two separate static
// HTML files — no runtime language selection, no loss of static output.
//
// This file is the single source of truth for home-page copy in both locales.
// Vietnamese is a draft translation — review the marketing tone before launch.

import type { Locale } from "./index";

export interface Strings {
  seo: { title: string; description: string };
  hero: {
    // The headline splits into two animated words (word1, word2) with static
    // text around them: `{lead} {word1} {mid} {word2}{tail}`.
    lead: string;
    word1: string;
    mid: string;
    word2: string;
    tail: string;
    paragraph: string;
    ctaStart: string;
    ctaDocs: string;
    ctaHowItWorks: string;
    joined: string;
  };
  footer: {
    tagline: string;
    product: string;
    company: string;
    language: string;
  };
  sections: {
    // Norse kickers (Ratatoskr, Veðrfölnir...) and the "Rata agent" title stay
    // untranslated — they are brand/proper nouns, set in ConceptSections.astro.
    agent: Section;
    primitives: Section;
    messengers: Section;
    connectors: Section;
    runtime: Section;
  };
  pricing: {
    heading: string;
    subheading: string;
    /** Badge on plans that aren't open yet. */
    soon: string;
    /** Four plans, in display order. */
    free: Plan;
    pro: Plan;
    team: Plan;
    enterprise: Plan;
  };
}

/** One concept section's translatable copy: its description and feature cards.
 *  `title`/`kicker`/`icon` that are brand terms stay in the Astro component. */
export interface Section {
  desc: string;
  cards: Record<string, Card>;
}
export interface Card {
  title: string;
  desc: string;
}
/** One pricing plan. `price` is a placeholder until pricing is finalized. */
export interface Plan {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
  /** Not open yet → dimmed card + "soon" badge. */
  disabled?: boolean;
  /** Price-changing add-on toggles. Any plan may define these; a plan with
   *  `addons` renders an interactive card whose price is computed from
   *  `basePrice` + `step` per enabled toggle. Selections feed the sign-up
   *  form later. When present, `basePrice`/`step`/`currency`/`per` are too. */
  addons?: Addon[];
  /** Base amount before any add-on (e.g. 9). Required when `addons` is set. */
  basePrice?: number;
  /** Amount each enabled add-on adds (e.g. 10). Required when `addons` is set. */
  step?: number;
  /** Currency symbol shown before the number (e.g. "$"). */
  currency?: string;
  /** Suffix after the price, e.g. "/mo". */
  per?: string;
}
/** One add-on toggle: a label + an info tooltip. Reusable across plans. */
export interface Addon {
  /** Stable id, used as the form field key later. */
  id: string;
  label: string;
  /** Tooltip body shown on hover/tap of the (i) icon. */
  tooltip: string;
}

export const strings: Record<Locale, Strings> = {
  en: {
    seo: {
      title: "Ratas — AI agents that run your business",
      description:
        "Ratas is an agentic AI platform. Turn a prompt into an app, workflow, or automation — Rata builds it, connects it to your tools, and keeps it running, all under your control.",
    },
    hero: {
      lead: "Your",
      word1: "agents",
      mid: "run your",
      word2: "business",
      tail: ".",
      paragraph:
        "Turn a prompt into an app, workflow, or automation. Rata builds it, connects it to your tools, and keeps it running.",
      ctaStart: "▶ start_free",
      ctaDocs: "▶ view_docs",
      ctaHowItWorks: "> see_how_it_works",
      joined: "✓ you're on the list.",
    },
    footer: {
      tagline: "Your agent runs your business.",
      product: "Product",
      company: "Company",
      language: "Language",
    },
    sections: {
      agent: {
        desc: "Prompt it, and Ratas builds the workflow, crafts the app, and running end-to-end. Zero code, zero friction.",
        cards: {
          memory: {
            title: "Memory",
            desc: "The agent's soul — Remembers context and behaviors, handles long conversations, and automates repetitive tasks.",
          },
          durability: {
            title: "Durability",
            desc: "Retry-safe turns that resume where they dropped, and actions that pause and continue later.",
          },
          tools: {
            title: "Tools & Actions",
            desc: "Workspace, code, browser, and MCP tools — with approval gates and run-once safety.",
          },
          alwaysOn: {
            title: "Always-on",
            desc: "Scheduled tasks and proactive turns let it act on its own — across web, chat, and voice.",
          },
        },
      },
      primitives: {
        desc: "Snippet · Widget · Gadget · Workflow — composable building blocks that combine into a whole system.",
        cards: {
          snippet: {
            title: "Snippet",
            desc: "A reusable block of logic with no UI — run it on demand or wire it into anything.",
          },
          widget: {
            title: "Widget",
            desc: "A small, glanceable UI you embed anywhere to surface live info at a glance.",
          },
          gadget: {
            title: "Gadget",
            desc: "A full mini web app — UI, agent, and data together — that acts on its own.",
          },
          workflow: {
            title: "Workflow",
            desc: "Multi-step, durable execution that runs to completion and resumes on failure.",
          },
        },
      },
      messengers: {
        desc: "Your agent reaches the outside world — sending and receiving messages through the channels you already use.",
        cards: {
          telegram: {
            title: "Telegram",
            desc: "Chat with your agent and get replies right inside Telegram.",
          },
          slack: {
            title: "Slack",
            desc: "Bring the agent into your workspace channels and DMs.",
          },
          whatsapp: {
            title: "WhatsApp",
            desc: "Reach your agent on the messenger your customers already use.",
          },
          zalo: {
            title: "Zalo",
            desc: "Connect with your agent over Zalo for local reach.",
          },
        },
      },
      connectors: {
        desc: "Your agent accesses your tools — controlled, and only with the permissions you grant.",
        cards: {
          workspace: {
            title: "Identity & Workspace",
            desc: "Sign in and work across Google, Microsoft, and Jira.",
          },
          social: {
            title: "Social",
            desc: "Reach LinkedIn, Facebook, TikTok, Instagram — and run Ads across them all.",
          },
          integrations: {
            title: "Integrations",
            desc: "Connect third-party platforms like Wordpress, Shopify, Odoo and more.",
          },
          yourOwn: {
            title: "Your own",
            desc: "Bring your own API, Data, and MCP servers.",
          },
        },
      },
      runtime: {
        desc: "Deploy, versioning, on-demand scaling, multi-model inference, and more — all inside the Ratas Runtime.",
        cards: {
          deploy: {
            title: "Deploy",
            desc: "Whatever the agent builds goes live instantly — no servers for you to set up.",
          },
          versioning: {
            title: "Versioning",
            desc: "Every change is versioned, so you can roll back or ship forward with confidence.",
          },
          scaling: {
            title: "Scaling",
            desc: "Scales on demand from zero to peak, then back down — you never manage capacity.",
          },
          multimodel: {
            title: "Multi-model",
            desc: "Intelligent Routing — automatically picking the right AI for every specific task.",
          },
        },
      },
    },
    pricing: {
      heading: "Pricing",
      subheading:
        "Try it free today. Join the waitlist for early access and exclusive plan details.",
      soon: "soon",
      free: {
        name: "Free",
        price: "$0",
        tagline: "Free forever for your personal projects.",
        features: ["600 credits per month", "Community support"],
        cta: "▶ join_waitlist",
      },
      pro: {
        name: "Pro",
        price: "Early access",
        tagline: "Built for freelancers and individual users.",
        features: [
          "2,000 credits per month",
          "Everything in Free",
          "Priority support channel with fast resolution",
        ],
        cta: "▶ join_waitlist",
        disabled: false,
        basePrice: 9,
        step: 10,
        currency: "$",
        per: "/mo",
        addons: [
          {
            id: "browser_automation",
            label: "Browser automation",
            tooltip:
              "Let your agent drive the browser — navigate sites, fill forms, click through flows, and scrape pages to automate repetitive web tasks end-to-end.",
          },
          {
            id: "social_media",
            label: "Social media",
            tooltip:
              "Automate posts, replies, and direct messages, and run ads and campaigns across your social accounts on a schedule.",
          },
        ],
      },
      team: {
        name: "Team",
        price: "Coming soon",
        tagline: "For small teams and development squads.",
        features: [
          "Full personalization: one dedicated agent per user",
          "Flexible feature requests and system integrations",
          "Track progress with transparent reporting",
        ],
        cta: "▶ join_waitlist",
        disabled: true,
      },
      enterprise: {
        name: "Enterprise",
        price: "Contact us",
        tagline: "For organizations adopting AI with strict data governance.",
        features: [
          "Everything in Team",
          "Multiple flexible workspaces",
          "Full data isolation & advanced security",
          "Replace the logo, brand, custom theme, and use your own domain",
        ],
        cta: "▶ contact_sales",
        disabled: true,
      },
    },
  },
  vi: {
    seo: {
      title: "Ratas — AI Agent vận hành doanh nghiệp của bạn",
      description:
        "Ratas là nền tảng AI agent. Biến một prompt thành ứng dụng, quy trình hay tự động hóa — Rata xây dựng, kết nối công cụ của bạn và vận hành liên tục, tất cả dưới quyền kiểm soát của bạn.",
    },
    hero: {
      // Headline: "Agent của bạn vận hành doanh nghiệp của bạn."
      // Animated words: "vận hành" and "doanh nghiệp".
      lead: "Vận hành",
      word1: "business",
      mid: "với",
      word2: "AI Agent",
      tail: ".",
      paragraph:
        "Biến một câu lệnh thành ứng dụng, quy trình hay tự động hóa. Rata xây dựng, kết nối công cụ của bạn và vận hành liên tục.",
      ctaStart: "▶ Bắt đầu",
      ctaDocs: "▶ Tài liệu",
      ctaHowItWorks: "> Khám phá cách thức",
      joined: "✓ bạn đã trong danh sách.",
    },
    footer: {
      tagline: "Vận hành business với AI Agent.",
      product: "Sản phẩm",
      company: "Công ty",
      language: "Ngôn ngữ",
    },
    sections: {
      agent: {
        desc: "Chỉ cần nêu yêu cầu, Ratas tự động thiết kế workflow, dựng ứng dụng và vận hành xuyên suốt — không cần code, không cấu hình rườm rà.",
        cards: {
          memory: {
            title: "Memory",
            desc: "Bộ nhớ agent — Ghi nhớ ngữ cảnh, hành vi, thấu hiểu hội thoại dài và tự động hóa các tác vụ lặp lại.",
          },
          durability: {
            title: "Durability",
            desc: "An toàn khi có lỗi, tự phục hồi các tác vụ. Dừng và tiếp tục bất cứ lúc nào mà không mất tiến trình.",
          },
          tools: {
            title: "Tools & Actions",
            desc: "Dùng workspace, code, trình duyệt và MCP — có bước duyệt trước khi thực thi.",
          },
          alwaysOn: {
            title: "Always-on",
            desc: "Tác vụ định kỳ và chủ động giúp agent tự hành động — trên web, chat và voice.",
          },
        },
      },
      primitives: {
        desc: "Snippet · Widget · Gadget · Workflow — Các thành phần lắp ráp đồng bộ tạo nên một hệ thống vận hành liền mạch.",
        cards: {
          snippet: {
            title: "Snippet",
            desc: "Mô đun logic thuần túy, tính tái sử dụng cao — hoạt động độc lập hoặc ghép nối linh hoạt vào hệ thống.",
          },
          widget: {
            title: "Widget",
            desc: "Giao diện thu gọn, dễ nắm bắt, hỗ trợ nhúng linh hoạt để hiển thị thông tin trực tiếp.",
          },
          gadget: {
            title: "Gadget",
            desc: "Ứng dụng web đóng gói độc lập — kết hợp liền mạch UI, AI agent và dữ liệu để tự vận hành hoàn chỉnh.",
          },
          workflow: {
            title: "Workflow",
            desc: "Chuỗi tác vụ đa bước, thực thi bền bỉ — vận hành xuyên suốt đến khi hoàn tất và tự động phục hồi khi gặp lỗi.",
          },
        },
      },
      messengers: {
        desc: "Agent kết nối ra thế giới bên ngoài — gửi và nhận tin nhắn qua những kênh bạn đang dùng.",
        cards: {
          telegram: {
            title: "Telegram",
            desc: "Trò chuyện với agent và nhận trả lời ngay trong Telegram.",
          },
          slack: {
            title: "Slack",
            desc: "Đưa agent vào các kênh và tin nhắn riêng trong workspace của bạn.",
          },
          whatsapp: {
            title: "WhatsApp",
            desc: "Tiếp cận agent trên nền tảng nhắn tin mà khách hàng của bạn đang dùng.",
          },
          zalo: {
            title: "Zalo",
            desc: "Kết nối với agent qua Zalo để tiếp cận người dùng trong nước.",
          },
        },
      },
      connectors: {
        desc: "Agent truy cập công cụ của bạn — có kiểm soát, và chỉ với quyền bạn cấp.",
        cards: {
          workspace: {
            title: "Identity & Workspace",
            desc: "Đăng nhập và làm việc trên Google, Microsoft và Jira.",
          },
          social: {
            title: "Social",
            desc: "Mở rộng hiện diện đồng thời trên LinkedIn, Facebook, TikTok, Instagram — đi kèm hệ thống quản lý và tối ưu quảng cáo tập trung.",
          },
          integrations: {
            title: "Integrations",
            desc: "Tích hợp hệ sinh thái bên thứ ba, với các nền tảng phổ biến như WordPress, Shopify, Odoo và nhiều hơn thế.",
          },
          yourOwn: {
            title: "Your own",
            desc: "Hỗ trợ mô hình BYO (Bring Your Own) — tùy ý tích hợp API, nguồn dữ liệu và MCP server riêng.",
          },
        },
      },
      runtime: {
        desc: "Tự động hóa triển khai, quản lý vòng đời, mở rộng theo tải và suy luận đa mô hình — tất cả trong một hạ tầng Ratas Runtime duy nhất.",
        cards: {
          deploy: {
            title: "Deploy",
            desc: "Mọi thành quả từ agent đều sẵn sàng trực tuyến tức thì — loại bỏ hoàn toàn gánh nặng vận hành máy chủ.",
          },
          versioning: {
            title: "Versioning",
            desc: "Cơ chế lưu trữ đa phiên bản, đảm bảo an toàn tuyệt đối, giúp bạn dễ dàng chuyển đổi trạng thái các thành phần.",
          },
          scaling: {
            title: "Scaling",
            desc: "Hạ tầng tự thích ứng theo nhu cầu: Mở rộng cao khi cao điểm và trở về không khi nhàn rỗi, loại bỏ hoàn toàn bài toán quản trị dung lượng.",
          },
          multimodel: {
            title: "Multi-model",
            desc: "Intelligent Routing: Tối ưu tốc độ, chi phí và chất lượng bằng cách tự động chọn mô hình phù hợp nhất cho từng yêu cầu.",
          },
        },
      },
    },
    pricing: {
      heading: "Bảng giá",
      subheading:
        "Trải nghiệm miễn phí hôm nay. Tham gia waitlist để nhận suất truy cập sớm và thông tin gói cước độc quyền.",
      soon: "sắp ra mắt",
      free: {
        name: "Free",
        price: "0đ",
        tagline: "Miễn phí trọn đời cho các dự án cá nhân của bạn.",
        features: ["600 credit mỗi tháng", "Hỗ trợ từ cộng đồng"],
        cta: "▶ Waitlist",
      },
      pro: {
        name: "Pro",
        price: "Truy cập sớm",
        tagline: "Dành riêng cho freelancer và người dùng cá nhân.",
        features: [
          "2000 credit mỗi tháng",
          "Toàn bộ từ gói Free",
          "Kênh hỗ trợ ưu tiên, giải quyết vấn đề nhanh chóng",
        ],
        cta: "▶ Waitlist",
        disabled: false,
        basePrice: 9,
        step: 10,
        currency: "$",
        per: "/tháng",
        addons: [
          {
            id: "browser_automation",
            label: "Tự động hóa trình duyệt",
            tooltip:
              "Cho agent điều khiển trình duyệt — mở trang, điền biểu mẫu, bấm qua các luồng và thu thập dữ liệu để tự động hóa trọn vẹn các tác vụ web lặp đi lặp lại.",
          },
          {
            id: "social_media",
            label: "Mạng xã hội",
            tooltip:
              "Tự động hóa đăng bài, trả lời và tin nhắn, đồng thời chạy quảng cáo và chiến dịch trên các tài khoản mạng xã hội theo lịch.",
          },
        ],
      },
      team: {
        name: "Team",
        price: "Sắp ra mắt",
        tagline: "Dành cho nhóm nhỏ & đội ngũ phát triển.",
        features: [
          "Cá nhân hóa tối đa: mỗi người dùng một agent riêng",
          "Linh hoạt yêu cầu tính năng và tích hợp hệ thống",
          "Quản lý và theo dõi tiến độ qua hệ thống báo cáo minh bạch",
        ],
        cta: "▶ Waitlist",
        disabled: true,
      },
      enterprise: {
        name: "Enterprise",
        price: "Liên hệ",
        tagline:
          "Dành cho các tổ chức ứng dụng AI với quản trị dữ liệu chặt chẽ.",
        features: [
          "Bao gồm toàn bộ đặc quyền từ gói Team",
          "Hỗ trợ đa không gian làm việc (nhiều workspace linh hoạt)",
          "Cô lập dữ liệu tuyệt đối (data isolation) & bảo mật nâng cao",
          "Thay logo, thương hiệu, giao diện (custom theme) & dùng tên miền riêng",
        ],
        cta: "▶ Liên hệ",
        disabled: true,
      },
    },
  },
};

export function getStrings(locale: Locale): Strings {
  return strings[locale];
}
