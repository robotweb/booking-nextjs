"use client";
import { AddBooking } from "@/components/dialog/addBooking";
import { DropdownMenuComponent } from "@/components/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);

  const handleSubmit = (response: any) => {
    console.log(response);
    if (response.success) {
      //@todo
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between p-6">
        <div></div>
        <DropdownMenuComponent />
      </div>
      <div className="hidden space-y-6 px-10 pb-16 md:block">
        <div className="flex items-center justify-between space-y-0.5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground"></p>
          </div>
          <div>
            <AddBooking returnSubmit={handleSubmit}></AddBooking>
          </div>
        </div>
        <Separator className="my-6" />
      </div>
    </div>
  );
}
