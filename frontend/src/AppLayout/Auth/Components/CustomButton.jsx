import React from 'react';

const CustomButton = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = true,
  variant = 'primary',
  className = '',
  style = {},
}) => {
  const variants = {
    primary: {
      bg: disabled
        ? 'rgba(139,92,246,0.15)'
        : 'rgba(139,92,246,0.08)',
      hoverBg: '#A78BFA',
      text: disabled ? 'rgba(139,92,246,0.4)' : '#F1F5F9',
      boxShadow: disabled ? 'none' : '0 0 24px rgba(139,92,246,0.3)',
      hoverBoxShadow: '0 0 36px rgba(139,92,246,0.5)',
    },
    success: {
      bg: disabled ? 'rgba(34,197,94,0.15)' : '#22C55E',
      hoverBg: '#4ADE80',
      text: disabled ? 'rgba(34,197,94,0.4)' : '#050508',
      boxShadow: disabled ? 'none' : '0 0 24px rgba(34,197,94,0.3)',
      hoverBoxShadow: '0 0 36px rgba(34,197,94,0.5)',
    },
    cyan: {
      bg: disabled ? 'rgba(34,211,238,0.12)' : '#0891B2',
      hoverBg: '#22D3EE',
      text: disabled ? 'rgba(34,211,238,0.4)' : '#050508',
      boxShadow: disabled ? 'none' : '0 0 24px rgba(34,211,238,0.2)',
      hoverBoxShadow: '0 0 36px rgba(34,211,238,0.4)',
    },
    outline: {
      bg: 'transparent',
      hoverBg: 'rgba(139,92,246,0.08)',
      text: '#8B5CF6',
      border: '1px solid rgba(139,92,246,0.3)',
      hoverBorder: 'rgba(139,92,246,0.6)',
      boxShadow: 'none',
    },
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full py-3 rounded-lg font-display text-sm tracking-[0.2em] uppercase font-bold
        transition-all duration-200 mt-1 flex items-center justify-center gap-2
        ${fullWidth ? 'w-full' : ''} ${className}
      `}
      style={{
        background: variantStyles.bg,
        color: variantStyles.text,
        boxShadow: variantStyles.boxShadow,
        border: variantStyles.border || 'none',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.background = variantStyles.hoverBg;
          e.currentTarget.style.boxShadow = variantStyles.hoverBoxShadow;
          if (variantStyles.hoverBorder) {
            e.currentTarget.style.border = `1px solid ${variantStyles.hoverBorder}`;
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.background = variantStyles.bg;
          e.currentTarget.style.boxShadow = variantStyles.boxShadow;
          if (variantStyles.border) {
            e.currentTarget.style.border = `1px solid ${variantStyles.border}`;
          }
        }
      }}
    >
      {loading ? (
        <>
          <span
            className="w-3.5 h-3.5 border-2 rounded-full inline-block"
            style={{
              borderColor: `${variantStyles.text}33`,
              borderTopColor: 'transparent',
              animation: 'spinSlow 0.7s linear infinite',
            }}
          />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;
