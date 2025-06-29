import { pageVariants, spinnerVariants } from "@/styles/variants";
import { cn } from "@/lib/utils";

const Loading = () => {
    return ( 
        <div className={cn(pageVariants(), "flex items-center justify-center")}>
            <div className={spinnerVariants({ size: 'xl' })}></div>
        </div>
     );
}
 
export default Loading;