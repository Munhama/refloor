import "../segments/segment.scss";

import NumberField from "../form/NumberField";

export default function DoorwayRow({ idx, item, onChange, onRemove }) {
  return (
    <div className="segment">
      <div className="segment__left">Проём #{idx + 1}</div>
      <div className="segment__right">
        <div className="segment__wrapper">
          <NumberField
            label="Ширина, м"
            step="0.1"
            value={item.width_m}
            onChange={(value) => onChange({ ...item, width_m: value })}
          />
          <NumberField
            label=" Количество"
            step="1"
            min="0"
            value={item.count}
            onChange={(value) => onChange({ ...item, count: value })}
          />
        </div>
        <button type="button" className="btn remove" onClick={onRemove}>
          Удалить
        </button>
      </div>
    </div>
  );
}
