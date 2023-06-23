import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import wnatAbi from "../../constants/abi/wnat.json";
import { useState } from "react";
import { formatEther, parseEther } from "viem";
import { BeatLoader, PropagateLoader } from "react-spinners";
import { useNotifications } from "@flrfinance/react-enotify";

interface Props {
  action: string;
  setAction: (a: string) => void;
}

const Form = (props: Props) => {
  const { addNotification, removeNotification } = useNotifications();

  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { chain } = useNetwork();
  const { action, setAction } = props;
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { config: depositConfig } = usePrepareContractWrite({
    address: "0x951857744785E80e2De051c32EE7b25f9c458C42",
    functionName: "deposit",
    abi: wnatAbi,
    enabled: amount.length !== 0 || !address || address?.length === 0,
    value: parseEther(amount),
  });
  const { config: withdrawConfig } = usePrepareContractWrite({
    address: "0x951857744785E80e2De051c32EE7b25f9c458C42",
    functionName: "withdraw",
    abi: wnatAbi,
    enabled: amount.length !== 0 || !address || address?.length === 0,
    args: [parseEther(amount)],
  });

  const { data: onDeposit, write: deposit } = useContractWrite({
    ...depositConfig,
    onError(error) {
      setIsLoading(false);
    },
  });
  const { data: onWithdraw, write: withdraw } = useContractWrite({
    ...withdrawConfig,
    onError(error) {
      setIsLoading(false);
    },
  });

  const isDeposited = useWaitForTransaction({
    hash: onDeposit?.hash,
    onSuccess(data) {
      setAmount("");
      setIsLoading(false);
      addNotification({
        id: "wrapNativeNotification",
        title: "Successfully Wrapped",
        description: `You just successfully wrapped ${amount} ${balance?.symbol} to W${balance?.symbol}`,
        status: "success",
        dismissible: true,
        dismissAfter: 5000,
        primaryAction: {
          label: "Explore",
          onClick: () => {
            window.open(
              `${chain?.blockExplorers?.default.url}tx/${onDeposit?.hash}`,
              "_blank"
            );
          },
        },
        secondaryAction: {
          label: "Dismiss",
          onClick: () => {
            removeNotification("wrapNativeNotification");
          },
        },
      });
    },
  });
  const isWithdrawn = useWaitForTransaction({
    hash: onWithdraw?.hash,
    onSuccess(data) {
      setAmount("");
      setIsLoading(false);
      addNotification({
        id: "wrapNativeNotification",
        title: "Successfully Wrapped",
        description: `You just successfully unwrapped ${amount} W${balance?.symbol} to ${balance?.symbol}`,
        status: "success",
        dismissible: true,
        dismissAfter: 5000,
        primaryAction: {
          label: "Explore",
          onClick: () => {
            window.open(
              `${chain?.blockExplorers?.default.url}tx/${onWithdraw?.hash}`,
              "_blank"
            );
          },
        },
        secondaryAction: {
          label: "Dismiss",
          onClick: () => {
            removeNotification("wrapNativeNotification");
          },
        },
      });
    },
  });

  const { data: wnatBalance }: any = useContractRead({
    address: "0x951857744785E80e2De051c32EE7b25f9c458C42",
    functionName: "balanceOf",
    abi: wnatAbi,
    args: [address],
  });

  return (
    <form
      className='flex flex-col'
      onSubmit={(e) => {
        e.preventDefault();
        if (deposit) {
          deposit();
        }
      }}
    >
      <div className='flex flex-col'>
        <div className='flex flex-row'>
          <div className='flex flex-col flex-auto'>
            <label>Balance</label>
          </div>
          <div className='flex flex-col'>
            <p>
              {wnatBalance && action === "wrap"
                ? Number(formatEther(wnatBalance)).toFixed(4) +
                  " W" +
                  balance?.symbol
                : action === "unwrap"
                ? Number(balance?.formatted.toString()).toFixed(4) +
                  " " +
                  balance?.symbol
                : ""}
            </p>
          </div>
        </div>
        <div className='flex flex-row border border-gray-300 rounded-lg p-2'>
          <input
            type='text'
            className='flex flex-auto'
            disabled
            value={
              balance && action === "wrap"
                ? balance.formatted.toString()
                : action === "unwrap"
                ? wnatBalance && Number(formatEther(wnatBalance)).toFixed(4)
                : ""
            }
          />
          <p>{action === "wrap" ? balance?.symbol : "W" + balance?.symbol}</p>
        </div>
      </div>
      <div className='flex flex-col pt-5'>
        <label>
          To {action && action.charAt(0).toUpperCase() + action.slice(1)}
        </label>
        <input
          className='border border-gray-300 rounded-lg p-2'
          type='text'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <div className='flex row pt-5'>
          <div className='flex flex-col flex-auto items-start'>
            <div
              className='btn'
              onClick={() => setAction(action === "wrap" ? "unwrap" : "wrap")}
            >
              {action === "wrap" ? "Unwrap" : "Wrap"}
            </div>
          </div>
          <div className='flex flex-col items-end'>
            <button
              className='blue'
              disabled={isLoading}
              onClick={(e: any) => {
                e.preventDefault();
                if (!isLoading) {
                  if (action === "wrap") {
                    if (deposit) {
                      setIsLoading(true);
                      deposit();
                    }
                  } else {
                    if (withdraw) {
                      setIsLoading(true);
                      withdraw();
                    }
                  }
                }
              }}
            >
              {isLoading ? (
                <BeatLoader color='#fff' size={5} />
              ) : (
                action && action.charAt(0).toUpperCase() + action.slice(1)
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Form;
