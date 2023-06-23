import { Chain } from "wagmi";

const flareChain: Chain = {
  id: 14,
  name: "Flare Network",
  network: "flare",
  nativeCurrency: {
    decimals: 18,
    name: "Flare",
    symbol: "FLR",
  },
  rpcUrls: {
    default: {
      http: ["https://rixty.flr.finance/ext/bc/C/rpc"],
      webSocket: ["wss://rpc.flare.flr.finance/ext/bc/C/rpc"],
    },
    public: {
      http: ["https://rixty.flr.finance/ext/bc/C/rpc"],
      webSocket: ["wss://rpc.flare.flr.finance/ext/bc/C/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "Flare Explorer",
      url: "https://flare-explorer.flare.network",
    },
  },
  testnet: false,
};

const xdcMainnet: Chain = {
  id: 50,
  name: "XDC Mainnet",
  network: "xdcmainnet",
  nativeCurrency: {
    decimals: 18,
    name: "XDC",
    symbol: "XDC",
  },
  rpcUrls: {
    default: {
      http: ["https://erpc.xinfin.network"],
    },
    public: {
      http: ["https://erpc.xinfin.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "XDC Apothem Explorer",
      url: "https://explorer.xinfin.network/",
    },
  },
  testnet: false,
};

const songbirdChain: Chain = {
  id: 19,
  name: "Songbird Canary Network",
  network: "songbird",
  nativeCurrency: {
    decimals: 18,
    name: "Songbird",
    symbol: "SGB",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.songbird.flr.finance/ext/bc/C/rpc"],
      webSocket: ["wss://rpc.songbird.flr.finance/ext/bc/C/rpc"],
    },
    public: {
      http: ["https://rpc.songbird.flr.finance/ext/bc/C/rpc"],
      webSocket: ["wss://rpc.songbird.flr.finance/ext/bc/C/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "Songbird Explorer",
      url: "https://songbird-explorer.flare.network",
    },
  },
  testnet: false,
};

export { flareChain, songbirdChain, xdcMainnet };
