"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { DataTable } from "@/components/table/data-table";
import { AddPriceForm } from "@/components/form/add-price";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { getPrices } from "@/actions/data";
import { AddPrice } from "@/components/dialog/addPrice";

const SettingsUserPage = () => {
  type Price = {
    id: number;
    name: string;
    service: string;
    vehicle: string;
    origin: string;
    destination: string;
    price: number;
  };

  const formatToZAR = (value: any) => {
    const amount = value.getValue();
    console.log(typeof amount, amount);
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(amount);
  };

  const columns: ColumnDef<Price>[] = [
    {
      accessorKey: "serviceName",
      header: "Service",
    },
    {
      accessorKey: "vehicleName",
      header: "Vehicle",
    },
    {
      accessorKey: "startLocationName",
      header: "Origin",
    },
    {
      accessorKey: "endLocationName",
      header: "Destination",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (price) => formatToZAR(price),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const service = row.id;
        return (
          <div className="flex justify-end h-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const [data, setDate] = useState([]);

  const getData = async () => {
    const data = await getPrices();
    if (data.success) {
      setDate(data.data as []);
    } else {
      console.log(data.error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (response: any) => {
    try {
      if (response.success) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-6 space-y-4 flex-column">
      <AddPrice returnSubmit={handleSubmit}></AddPrice>
      <DataTable columns={columns} data={data}></DataTable>
    </div>
  );
};

export default SettingsUserPage;
