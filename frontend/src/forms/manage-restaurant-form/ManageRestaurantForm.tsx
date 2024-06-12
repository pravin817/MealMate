import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailSection from "./DetailSection";
import CuisinesSection from "./CuisinesSection";
import { Separator } from "@/components/ui/separator";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "Restaurant name is required",
    }),
    city: z.string({
      required_error: "City name is required",
    }),
    country: z.string({
      required_error: "Country name is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "Delivery price is required",
      invalid_type_error: "Delivery price must be a number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated delivery time is required",
      invalid_type_error: "Estimated delivery price must be a number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "Please select at least one item",
    }),
    menuItems: z
      .array(
        z.object({
          name: z.string().min(1, "Name is required"),
          price: z.coerce.number().min(1, "Price is required"),
        })
      )
      .nonempty({ message: "Please add at least one item" }),

    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either imageUrl or imageFile must be provided",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ restaurant, onSave, isLoading }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  // Load the data
  useEffect(() => {
    if (!restaurant) return;

    // Do the calculation for the formatted things here
    form.reset(restaurant);
  }, [restaurant, form]);

  const onSubmit = (FormDataJson: RestaurantFormData) => {
    // TODO - convert the formDataJson to a new FormData object

    const formData = new FormData();

    formData.append("restaurantName", FormDataJson.restaurantName);
    formData.append("city", FormDataJson.city);
    formData.append("country", FormDataJson.country);
    formData.append("deliveryPrice", FormDataJson.deliveryPrice.toString());
    formData.append(
      "estimatedDeliveryTime",
      FormDataJson.estimatedDeliveryTime.toString()
    );

    FormDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    FormDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
    });

    if (FormDataJson.imageFile) {
      formData.append("imageFile", FormDataJson.imageFile);
    }

    onSave(formData);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />

        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-red-500">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
