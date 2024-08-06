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

export const AddClient = ({ returnSubmit }) => {
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
        <Button>Add Client</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4">Add Client</DialogTitle>
          <DialogDescription>
            <AddClientForm returnSubmit={handleSubmit}></AddClientForm>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
