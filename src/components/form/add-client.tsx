import { Label } from "@radix-ui/react-dropdown-menu";
import { FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { addClient } from "@/actions/data";
// @ts-ignore
export const AddClientForm = ({ returnSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (formData.name === "") return;
      const response = await addClient(formData);
      if (response.success) {
        setFormData({
          name: "",
          email: "",
          phone: "",
        });
      }
      returnSubmit(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit}>
        <FormItem className="w-full gap-2">
          <Input
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            id="phone"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </FormItem>
        <Button className="w-1/4">Submit</Button>
      </form>
    </>
  );
};
