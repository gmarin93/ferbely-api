'use client';

import { headerVariants, textVariants } from "@/styles/variants";
import { cn } from "@/lib/utils";

const Header = ({title, children}: {title: string, children?: React.ReactNode}) => {
  return (
    <div className={headerVariants()}>
      <div>
        <h1 className={textVariants({ variant: 'h1' })}>{title}</h1>
        <p className={cn(textVariants({ variant: 'muted' }), "mt-2")}>
          Manage {title.toLowerCase()} in your property management system
        </p>
      </div>
      {children && (
        <div className="flex-shrink-0">
          {children}
        </div>
      )}
    </div>
  );
};

export default Header;
