"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building } from "lucide-react";
import { buildingApi, contractApi, userApi } from "@/services/api";
import { useFormMutation } from "@/hooks/useFormMutation";
import { FormContainer } from "./FormContainer";
import { InputField, SelectField } from "./FormField";
import { Building as BuildingType, User } from "@/types";
import useFetch from "@/hooks/useFetch";

const contractSchema = z.object({
  name: z.string().min(1, "Contract name is required").max(255),
  type: z.enum(["monthly", "yearly"], {
    required_error: "Please select a contract type",
  }),
  building: z.string().min(1, "Building is required"),
  price: z.string().min(1, "Price is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  user_id: z.string().min(1, "User is required"),
});

type ContractFormData = z.infer<typeof contractSchema>;

interface ContractFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ContractForm({
  onSuccess,
  onCancel,
}: ContractFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
  });

  const { submit, isSubmitting, error } = useFormMutation({ 
    mutationFn: contractApi.create,
    queryKey: "contracts",
    onSuccess: () => {
      reset();
      onSuccess?.();
    },
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useFetch("users", false, userApi.getAll);

  const {
    data: buildingsData,
    isLoading: buildingsLoading,
    error: buildingsError,
  } = useFetch("buildings", false, buildingApi.getAll);

  const users: User[] = usersData?.data?.results ?? [];

  const buildings: BuildingType[] = buildingsData?.data?.results ?? [];

  return (
    <form onSubmit={handleSubmit(submit)}>
      {usersLoading && <div>Loading...</div>}
      {usersError && <div>Error loading users</div>}
      <FormContainer
        title="Create New Contract"
        icon={Building}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        submitText="Create Contract"
        error={error ? "Error creating contract. Please try again." : undefined}
      >
        <div className="space-y-4">
          <InputField
            label="Contract Name"
            register={register("name")}
            error={errors.name}
            required
            placeholder="Enter contract name"
          />

          <SelectField
            label="Contract Type"
            register={register("type")}
            error={errors.type}
            required
            placeholder="Select contract type"
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly" },
            ]}
          />
          <SelectField
            label="Building"
            register={register("building")}
            error={errors.building}
            required
            placeholder="Select building"
            options={buildings?.map((building: BuildingType) => ({
              value: building.id.toString(),
              label: building.name,
            }))}
          />
          <InputField
            label="Price"
            register={register("price")}
            error={errors.price}
            required
            placeholder="Enter price"
          />
          <InputField
            type="date"
            label="Start Date"
            register={register("start_date")}
            error={errors.start_date}
            required
            placeholder="Enter start date"
          />
          <InputField
            type="date"
            label="End Date"
            register={register("end_date")}
            error={errors.end_date}
            required
            placeholder="Enter end date"
          />
          <SelectField
            label="Owner"
            register={register("user_id")}
            error={errors.user_id}
            required
            placeholder="Select Owner"
            options={users?.map((user: User) => ({
              value: user.id.toString(),
              label: user.first_name + " " + user.last_name,
            }))}
          />
        </div>
      </FormContainer>
    </form>
  );
}
