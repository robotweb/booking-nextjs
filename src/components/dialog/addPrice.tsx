import { useState } from "react";
import { AddClientForm } from "../form/add-client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AddPriceForm } from "../form/add-price";

export const AddPrice = ({ returnSubmit }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (response: any) => {
    console.log(response);
    if (response.success) {
      //@todo
      setDialogOpen(false);
    }
    returnSubmit(response);
  };
  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={() => {
        setDialogOpen(!dialogOpen);
      }}
    >
      <DialogTrigger>
        <Button>Add Price</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4">Add Price</DialogTitle>
          <DialogDescription>
            <AddPriceForm returnSubmit={handleSubmit}></AddPriceForm>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
