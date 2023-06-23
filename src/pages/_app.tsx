import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "@flrfinance/react-enotify/dist/styles/index.scss";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { NotificationsProvider } from "@flrfinance/react-enotify";

import { publicProvider } from "@wagmi/core/providers/public";

import type { AppProps } from "next/app";
import { xdcMainnet } from "@/constants/chains";

export default function App({ Component, pageProps }: AppProps) {
  const { chains, publicClient } = configureChains(
    [xdcMainnet],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "ETHGlobal Workshop",
    projectId: "07d0b94404fbfb44aecf37968d8e0e11",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
