import "./segment.scss";

import NumberField from "../form/NumberField";

export default function SegmentRow({ idx, item, onChange, onRemove }) {
  return (
    <div className="segment">
      <div className="segment__left">Сегмент #{idx + 1}</div>
      <div className="segment__right">
        <div className="segment__wrapper">
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
        </div>
        <button type="button" className="btn remove" onClick={onRemove}>
          Удалить
        </button>
      </div>
    </div>
  );
}
