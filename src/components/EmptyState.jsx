import React from 'react';

/**
 * Reusable empty state component
 * @param {Object} props
 * @param {React.Component} props.icon - Icon component (lucide-react)
 * @param {string} props.title - Main title text
 * @param {string} props.subtitle - Optional subtitle/description
 * @param {React.Component} props.action - Optional action button component
 */
function EmptyState({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="mb-4 p-4 rounded-full bg-slate-100">
        {Icon && <Icon className="w-8 h-8 text-slate-400" />}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      {subtitle && (
        <p className="text-sm text-slate-500 mb-4 max-w-xs">{subtitle}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export default EmptyState;
