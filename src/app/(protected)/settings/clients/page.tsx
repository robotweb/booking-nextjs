"use client";
import { Accordion } from "@/components/ui/accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { getClients } from "@/actions/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/data-table";
import { AddClientForm } from "@/components/form/add-client";
import { AddClient } from "@/components/dialog/addClient";

const SettingsSericesPage = () => {
  type Client = {
    id: string;
    name: string;
    email: string;
    phone: string;
  };

  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: "name",
      header: "Name",
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

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const result = await getClients();
      console.log(result);
      if (result.success) {
        setData(result.data as []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (response: any) => {
    console.log(response);
    if (response.success) {
      getData();
    }
  };

  return (
    <div className="p-6 space-y-4 flex-column">
      <AddClient returnSubmit={handleSubmit}></AddClient>
      <DataTable columns={columns} data={data}></DataTable>
    </div>
  );
};

export default SettingsSericesPage;
