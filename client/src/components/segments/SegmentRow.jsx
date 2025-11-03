import NumberField from "../form/NumberField";

export default function SegmentRow({ idx, item, onChange, onRemove }) {
  return (
    <>
      <div className="">Сегмент #{idx + 1}</div>
      <div className="">
        <NumberField
          label="Ширина, м"
          value={item.width_m}
          onChange={(value) => onChange({ ...item, width_m: value })}
        />
        <NumberField
          label="Длина, м"
          value={item.length_m}
          onChange={(value) => onChange({ ...item, length_m: value })}
        />
        <button type="button" className="btn remove" onClick={onRemove}>
          Удалить
        </button>
      </div>
    </>
  );
}
