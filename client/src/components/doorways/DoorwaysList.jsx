import "../segments/segment.scss";

import DoorwayRow from "./DoorwayRow";

export default function DoorwaysList({ doorways, setDoorways }) {
  const update = (index, next) => {
    const copy = doorways.slice();
    copy[index] = next;
    setDoorways(copy);
  };
  const remove = (index) => {
    const copy = doorways.slice();
    copy.splice(index, 1);
    setDoorways(copy);
  };
  const add = () =>
    setDoorways([...(doorways || []), { width_m: 0.9, count: 1 }]);

  return (
    <>
      <h2>Дверные проёмы</h2>
      {(doorways || []).map((item, index) => (
        <DoorwayRow
          key={index}
          idx={index}
          item={item}
          onChange={(next) => update(index, next)}
          onRemove={() => remove(index)}
        />
      ))}
      <button type="button" className="btn add" onClick={add}>
        + Добавить проём
      </button>
    </>
  );
}
