'use client';

const Header = ({title, children}: {title: string, children?: React.ReactNode}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-gray-600">
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
