import { useCreateMyRestaurant } from "@/api/MyRestaurantApi";
import { Separator } from "@/components/ui/separator";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  return (
    <div>
      <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
      <Separator />
    </div>
  );
};

export default ManageRestaurantPage;
