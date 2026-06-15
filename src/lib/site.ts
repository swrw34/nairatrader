export const SITE = {
  name: "NairaTrader Academy",
  shortName: "NairaTrader",
  tagline: "Forex mentorship, signals & VIP community for African traders.",
  mentors: [
    { name: "Sabiigal", handle: "@midrizzy1", x: "https://x.com/midrizzy1" },
    { name: "VixMayor", handle: "@Vix_Mayor", x: "https://x.com/Vix_Mayor" },
    { name: "DAX", handle: "@thissdax", x: "https://x.com/thissdax" },
  ],
  wallets: {
    BTC: "bc1qv3dh9zn524ekhe0f4q2vcyx3evwgquxy6sztzz",
    USDT: "TMdHG2FG58gG2ibzjxiyMDCLGirZGD4WBU", // TRC-20
  },
  plans: {
    mentorship: { price: 5, name: "Mentorship" },
    vip: { price: 10, name: "VIP Signals" },
  },
  busha: "https://busha.io",
} as const;
