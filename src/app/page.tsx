"use client";

import { Button } from "@/components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import {
  braavos,
  useAccount,
  useConnect,
  useContract,
  useDisconnect,
  useReadContract,
  useSendTransaction,
} from "@starknet-react/core";
import * as ethContract from "@/contracts/eth";
import { Input } from "@/components/Input";
import { useState } from "react";

export default function Home() {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const [transferAmount, setTransferAmount] = useState(0);
  const [targetAddress, setTargetAddress] = useState("");

  const { data, isLoading } = useReadContract({
    abi: ethContract.abi,
    address: ethContract.address,
    functionName: "balance_of",
    args: [address],
    enabled: isConnected,
  });

  const { contract } = useContract({
    ...ethContract,
  });

  const { sendAsync: sendTransferEthTransaction } = useSendTransaction({});

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Card>
        <CardHeader>
          <CardTitle>Wallet connection Demo</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col justify-center">
          <Button
            variant={"default"}
            onClick={() => {
              if (isConnected) disconnect();
              else connect({ connector: braavos() });
            }}
          >
            {isConnected ? "Disconnect" : "Connect Wallet"}
          </Button>
          {isConnected && <div>Address: {address}</div>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Eth Balance Read Demo</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col justify-center">
          {!isConnected && <div>Wallet not connected</div>}
          {isConnected &&
            (isLoading ? (
              <div>Loading...</div>
            ) : (
              <div>{(Number(data) / 10 ** 18).toString()} ETH</div>
            ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Transfer Eth Demo</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col justify-center">
          {!isConnected && <div>Wallet not connected</div>}
          {isConnected && (
            <>
              <Input
                type="number"
                onChange={(e) => setTransferAmount(Number(e.target.value))}
                step="0.001"
                placeholder={"Input transfer amount in ETH"}
              ></Input>
              <Input
                onChange={(e) => setTargetAddress(e.target.value)}
                placeholder={"Input destination address"}
              ></Input>
              <Button
                className="mt-2"
                onClick={async () => {
                  await sendTransferEthTransaction([
                    contract.populate("approve", [
                      targetAddress,
                      transferAmount * 10 ** 18,
                    ]),
                    contract.populate("transfer", [
                      targetAddress,
                      transferAmount * 10 ** 18,
                    ]),
                  ]);
                }}
              >
                Send
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
