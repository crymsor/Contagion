import React from 'react';

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  required = false,
  error,
  disabled = false,
  prefixIcon,
  suffixButton,
  customStyle = {},
  labelStyle = {},
  focusedColor = 'rgba(139,92,246,0.4)',
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          className="block font-code text-[10px] tracking-[0.2em] uppercase transition-colors duration-200"
          style={{ color: error ? '#F87171' : undefined, ...labelStyle }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 rounded-lg font-code text-sm outline-none transition-all duration-200 ${
            error ? 'ring-1 ring-red-500/50' : ''
          }`}
          style={{
            background: disabled ? 'rgba(5,5,8,0.5)' : 'rgba(5,5,8,0.95)',
            border: error
              ? '1px solid rgba(239,68,68,0.4)'
              : `1px solid ${focusedColor.replace('0.4', '1')}`,
            color: '#E2E8F0',
            boxShadow: `0 0 0 3px ${focusedColor.replace('0.4', '0.07')}`,
            ...customStyle,
          }}
        />
        {prefixIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {prefixIcon}
          </div>
        )}
        {suffixButton && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-auto">
            {suffixButton}
          </div>
        )}
      </div>
      {error && (
        <p className="font-code text-[10px]" style={{ color: '#F87171' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
