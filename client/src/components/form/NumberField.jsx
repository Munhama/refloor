export default function NumberField({
  label,
  value,
  onChange,
  step = "0.1",
  min = "0",
  ...rest
}) {
  return (
    <label className="">
      <span>{label}</span>
      <input
        type="number"
        step={step}
        min={min}
        value={value ?? ""}
        onChange={(e) => onChange?.(Number(e.target.value))}
        {...rest}
      />
    </label>
  );
}
