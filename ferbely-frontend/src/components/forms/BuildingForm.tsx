"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building } from "lucide-react";
import { buildingApi, userApi } from "@/services/api";
import { useFormMutation } from "@/hooks/useFormMutation";
import { FormContainer } from "./FormContainer";
import { InputField, SelectField } from "./FormField";
import { User, Building as BuildingType } from "@/types";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";

const buildingSchema = z.object({
  name: z.string().min(1, "Building name is required").max(255),
  address: z.string().min(1, "Address is required"),
  role: z.enum(["house", "apartment", "office", "shop", "other"], {
    required_error: "Please select a building type",
  }),
  owner: z.string().min(1, "Owner is required"),
});

type BuildingFormData = z.infer<typeof buildingSchema>;

interface BuildingFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialData?: BuildingType;
  isEditMode?: boolean;
}

export default function BuildingForm({
  onSuccess,
  onCancel,
  initialData,
  isEditMode = false,
}: BuildingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<BuildingFormData>({
    resolver: zodResolver(buildingSchema),
    defaultValues: isEditMode && initialData ? {
      name: initialData.name,
      address: initialData.address || "",
      role: initialData.role as any,
      owner: initialData.owner?.toString() || "",
    } : {},
  });

  // Set form values when editing
  useEffect(() => {
    if (isEditMode && initialData) {
      setValue("name", initialData.name);
      setValue("address", initialData.address || "");
      setValue("role", initialData.role as any);
      setValue("owner", initialData.owner?.toString() || "");
    }
  }, [initialData, isEditMode, setValue]);

  const mutationFn = isEditMode 
    ? (data: BuildingFormData) => buildingApi.update(initialData!.id, data)
    : buildingApi.create;

  const { submit, isSubmitting, error } = useFormMutation({
    mutationFn,
    queryKey: "buildings",
    onSuccess: () => {
      if (!isEditMode) reset();
      onSuccess?.();
    },
  });

  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useFetch("users", false, userApi.getAll);

  const users: User[] = usersData?.data?.results ?? [];

  return (
    <form onSubmit={handleSubmit(submit)}>
      {usersLoading && <div>Loading...</div>}
      {usersError && <div>Error loading users</div>}
      <FormContainer
        title={isEditMode ? "Edit Building" : "Add New Building"}
        icon={Building}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        submitText={isEditMode ? "Update Building" : "Create Building"}
        error={error ? `Error ${isEditMode ? 'updating' : 'creating'} building. Please try again.` : undefined}
      >
        <div className="space-y-4">
          <InputField
            label="Building Name"
            register={register("name")}
            error={errors.name}
            required
            placeholder="Enter building name"
          />

          <InputField
            label="Address"
            register={register("address")}
            error={errors.address}
            required
            placeholder="Enter building address"
          />

          <SelectField
            label="Building Type"
            register={register("role")}
            error={errors.role}
            required
            placeholder="Select building type"
            options={[
              { value: "house", label: "House" },
              { value: "apartment", label: "Apartment" },
              { value: "office", label: "Office" },
              { value: "shop", label: "Shop" },
              { value: "other", label: "Other" },
            ]}
          />
          <SelectField
            label="Owner"
            register={register("owner")}
            error={errors.owner}
            required
            placeholder="Select owner"
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
