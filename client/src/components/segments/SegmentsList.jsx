import "./segment.scss";

import SegmentRow from "./SegmentRow";

export default function SegmentsList({ segments, setSegments }) {
  const update = (index, next) => {
    const copy = segments.slice();
    copy[index] = next;
    setSegments(copy);
  };
  const remove = (index) => {
    const copy = segments.slice();
    copy.splice(index, 1);
    setSegments(copy.length ? copy : [{ width_m: 3, length_m: 4 }]);
  };
  const add = () =>
    setSegments([...segments, { width_m: null, length_m: null }]);

  return (
    <>
      <h2>Сегменты</h2>
      {segments.map((item, index) => (
        <SegmentRow
          key={index}
          idx={index}
          item={item}
          onChange={(next) => update(index, next)}
          onRemove={() => remove(index)}
        />
      ))}
      <button type="button" className="btn add" onClick={add}>
        + Добавить сегмент
      </button>
    </>
  );
}
