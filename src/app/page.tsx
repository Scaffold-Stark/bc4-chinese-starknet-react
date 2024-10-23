"use client";

import { Button } from "@/components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/Card";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Card>
        <CardHeader>
          <CardTitle>Wallet connection Demo</CardTitle>
        </CardHeader>
        <CardContent className="w-full flex justify-center">
          <Button variant={"default"} className="w-full">
            Connect Wallet
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
