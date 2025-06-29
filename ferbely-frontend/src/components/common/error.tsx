import { pageVariants, textVariants } from "@/styles/variants";
import { cn } from "@/lib/utils";

const Error = () => {
  return (
    <div className={cn(pageVariants(), "flex items-center justify-center")}>
      <div className={textVariants({ align: 'center' })}>
        <h1 className={cn(textVariants({ variant: 'h2', weight: 'bold' }), "text-red-600 mb-4")}>
          Connection Error
        </h1>
        <p className={cn(textVariants({ variant: 'body' }), "text-gray-600 mb-4")}>
          Unable to connect to the backend. Please make sure the Django server
          is running.
        </p>
        <p className={cn(textVariants({ variant: 'small' }), "text-gray-500")}>
          Expected backend URL:{" "}
          {process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v0"}
        </p>
      </div>
    </div>
  );
};

export default Error;
