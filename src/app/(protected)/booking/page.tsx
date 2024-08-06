"use client";

import { DropdownMenuComponent } from "@/components/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Booking() {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between p-6">
        <Button
          variant="ghost"
          className="rounded-full"
          size="icon"
          onClick={() => {
            router.push("/");
          }}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
        <DropdownMenuComponent />
      </div>
      <div className="hidden space-y-6 px-10 pb-16 md:block">
        <div className="flex items-center justify-between space-y-0.5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Booking</h2>
            <p className="text-muted-foreground"></p>
          </div>
        </div>
        <Separator className="my-6" />
      </div>
    </div>
  );
}
