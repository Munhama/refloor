import "./field.scss";

export default function SelectField({
  label,
  value,
  onChange,
  options,
  getLabel,
  getValue,
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value ?? ""} onChange={(e) => onChange?.(e.target.value)}>
        {options?.length ? null : <option value="">—</option>}
        {options?.map((option) => {
          const value = getValue ? getValue(option) : option.value ?? option.id;
          const label = getLabel
            ? getLabel(option)
            : option.label ?? option.name;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </label>
  );
}
