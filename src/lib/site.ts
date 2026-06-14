export const SITE = {
  name: "NairaTrader",
  tagline: "Forex mentorship, signals & VIP community for African traders.",
  mentors: [
    { name: "Sabiigal", handle: "@midrizzy1", x: "https://x.com/midrizzy1" },
    { name: "VixMayor", handle: "@Vix_Mayor", x: "https://x.com/Vix_Mayor" },
    { name: "DAX", handle: "@thissdax", x: "https://x.com/thissdax" },
  ],
  wallets: {
    BTC: "bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    USDT: "TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // TRC-20
    ETH: "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  },
  plans: {
    mentorship: { price: 5, name: "Mentorship" },
    vip: { price: 10, name: "VIP Signals" },
  },
} as const;
