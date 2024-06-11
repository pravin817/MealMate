import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Menu section</h2>
        <FormDescription>
          Add the menu items that your restaurant serves, add the name and price
          of the menu
        </FormDescription>
      </div>

      <FormField
        control={control}
        name="menuItem"
        render={({ field }) => (
          <FormItem className=" flex flex-col gap-2">
            {fields.map((_, index) => (
              <MenuItemInput
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Add Menu Item
      </Button>
    </div>
  );
};

export default MenuSection;
