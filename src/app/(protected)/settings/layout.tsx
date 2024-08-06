"use client";
import { DropdownMenuComponent } from "@/components/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SidebarNav } from "@/components/settings-sidebar-nav";
import { useSession, SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const sidebarNavItems = [
    {
      title: "Profile",
      href: "/settings/profile",
    },
    {
      title: "Users",
      href: "/settings/users",
    },
    {
      title: "Clients",
      href: "/settings/clients",
    },
    {
      title: "Services",
      href: "/settings/services",
    },
    {
      title: "Locations",
      href: "/settings/locations",
    },
    {
      title: "Vehicles",
      href: "/settings/vehicles",
    },
    {
      title: "Prices",
      href: "/settings/prices",
    },
  ];
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
      <div className=" space-y-6 px-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5 overflow-auto">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-3xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
