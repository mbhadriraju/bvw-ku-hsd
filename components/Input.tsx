import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={`
          w-full
          rounded-xl
          border
          border-gray-300
          bg-gray-300
          px-4
          py-2
          text-base
          text-gray-900
          placeholder-gray-400
          focus:outline-none
          disabled:bg-gray-100
          transition
          font-subtitle
          ${className}
        `}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;