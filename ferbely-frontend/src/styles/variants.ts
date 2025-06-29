import { cva } from 'class-variance-authority';

// Button variants
export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        ghost: 'hover:bg-gray-100 focus:ring-gray-500 text-gray-700',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      },
      size: {
        sm: 'px-3 py-2 text-xs',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Card variants
export const cardVariants = cva('bg-white rounded-lg shadow', {
  variants: {
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    border: {
      none: '',
      light: 'border border-gray-200',
      heavy: 'border-2 border-gray-300',
    },
    hover: {
      none: '',
      lift: 'hover:shadow-lg transition-shadow',
      scale: 'hover:scale-105 transition-transform',
    },
  },
  defaultVariants: {
    padding: 'md',
    border: 'none',
    hover: 'none',
  },
});

// Badge/Status variants
export const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  {
    variants: {
      variant: {
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
        neutral: 'bg-gray-100 text-gray-800',
        purple: 'bg-purple-100 text-purple-800',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
);

// Input field variants
export const inputVariants = cva(
  'block w-full rounded-md border transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        error: 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500',
        success: 'border-green-300 focus:ring-2 focus:ring-green-500 focus:border-green-500',
      },
      size: {
        sm: 'px-2 py-1 text-sm',
        md: 'px-3 py-2',
        lg: 'px-4 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Text variants
export const textVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-3xl font-bold text-gray-900',
      h2: 'text-2xl font-semibold text-gray-900',
      h3: 'text-xl font-semibold text-gray-900',
      h4: 'text-lg font-medium text-gray-900',
      body: 'text-sm text-gray-700',
      muted: 'text-sm text-gray-500',
      small: 'text-xs text-gray-400',
      caption: 'text-xs text-gray-600 uppercase tracking-wide',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

// Table variants
export const tableVariants = cva('min-w-full divide-y', {
  variants: {
    variant: {
      default: 'divide-gray-200',
      bordered: 'divide-gray-200 border border-gray-200',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// Table header cell variants
export const tableHeaderVariants = cva(
  'text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100',
  {
    variants: {
      size: {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-xs',
        lg: 'px-8 py-4 text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// Table cell variants
export const tableCellVariants = cva('whitespace-nowrap', {
  variants: {
    size: {
      sm: 'px-4 py-2',
      md: 'px-6 py-4',
      lg: 'px-8 py-5',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    size: 'md',
    align: 'left',
  },
});

// Container/Layout variants
export const containerVariants = cva('mx-auto px-4', {
  variants: {
    size: {
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-full',
    },
    padding: {
      none: 'px-0',
      sm: 'px-2 sm:px-4',
      md: 'px-4 sm:px-6',
      lg: 'px-4 sm:px-6 lg:px-8',
    },
  },
  defaultVariants: {
    size: 'xl',
    padding: 'lg',
  },
});

// Page layout variants
export const pageVariants = cva('min-h-screen', {
  variants: {
    background: {
      default: 'bg-gray-50',
      white: 'bg-white',
      gradient: 'bg-gradient-to-br from-gray-50 to-gray-100',
    },
    padding: {
      none: '',
      sm: 'py-4',
      md: 'py-8',
      lg: 'py-12',
    },
  },
  defaultVariants: {
    background: 'default',
    padding: 'md',
  },
});

// Header layout variants
export const headerVariants = cva('flex items-center justify-between', {
  variants: {
    spacing: {
      sm: 'mb-4',
      md: 'mb-8',
      lg: 'mb-12',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

// Navigation link variants
export const navLinkVariants = cva(
  'flex items-center space-x-2 rounded-md text-sm font-medium transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
        active: 'bg-blue-50 text-blue-700 border-b-2 border-blue-600',
      },
      size: {
        sm: 'px-2 py-1',
        md: 'px-3 py-2',
        lg: 'px-4 py-3',
      },
      display: {
        desktop: '',
        mobile: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      display: 'desktop',
    },
  },
);

// Alert/Error variants
export const alertVariants = cva(
  'rounded-md border p-3',
  {
    variants: {
      variant: {
        error: 'bg-red-50 border-red-200 text-red-600',
        success: 'bg-green-50 border-green-200 text-green-600',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-600',
        info: 'bg-blue-50 border-blue-200 text-blue-600',
      },
      size: {
        sm: 'text-xs p-2',
        md: 'text-sm p-3',
        lg: 'text-base p-4',
      },
    },
    defaultVariants: {
      variant: 'info',
      size: 'md',
    },
  },
);

// Loading/Spinner variants
export const spinnerVariants = cva('animate-spin rounded-full border-b-2', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
      xl: 'h-32 w-32',
    },
    color: {
      primary: 'border-blue-500',
      secondary: 'border-gray-500',
      success: 'border-green-500',
      danger: 'border-red-500',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
}); 