import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Form from "@/components/Form";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [action, setAction] = useState("wrap");
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <div className='flex flex-row container mx-auto'>
        <div className='flex flex-auto'>
          <p className='justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
            EthGlobal Workshop
          </p>
        </div>
        <div>
          <ConnectButton chainStatus='icon' />
        </div>
      </div>
      <div className='flex flex-col flex-auto w-1/2 py-[100px]'>
        <Form action={action} setAction={(a: string) => setAction(a)} />
      </div>
    </main>
  );
}
