import { forwardRef } from "react";

const InputField = forwardRef(function InputField(
  { label, name, error, ...props },
  ref
) {
  return (
    <div>
      <label htmlFor={name} className="label">
        <span className="label-text">{label}</span>
      </label>

      <input
        ref={ref}
        id={name}
        name={name}
        className={`input input-bordered w-full ${
          error ? "input-error" : ""
        }`}
        {...props}
      />

      {error && (
        <p className="text-error text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

export default InputField;