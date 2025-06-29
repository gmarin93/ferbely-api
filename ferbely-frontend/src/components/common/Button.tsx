"use client";

import { usePathname, useRouter } from "next/navigation";

interface ButtonComponentProps {
  createFor: 'buildings' | 'tasks' | 'contracts' | 'users' | 'login';
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const ButtonComponent = ({ 
  createFor, 
  children, 
  onClick,
  variant = 'primary',
  size = 'md'
}: ButtonComponentProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    // Auto-routing or modal opening based on createFor
    if (createFor === 'login') {
      router.push('/login');
    } else {
      router.push(`/${createFor}/new`);
    }
    // Or: openModal(`create-${createFor}`);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
        size === 'lg' ? 'px-6 py-3 text-base' : ''
      }`}
    >
      {children}
    </button>
  );
};
