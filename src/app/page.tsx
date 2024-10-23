"use client";

import { Button } from "@/components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";
import {
  argent,
  braavos,
  useAccount,
  useConnect,
  useDisconnect,
} from "@starknet-react/core";

export default function Home() {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

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
    </div>
  );
}
