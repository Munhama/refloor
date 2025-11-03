import "./home.scss";

import { useEffect, useMemo, useState } from "react";

import { useDictionaries } from "../hooks/useDictionaries";
import { useQuote } from "../hooks/useQuote";

import SegmentsList from "../components/segments/SegmentsList";
import DoorwaysList from "../components/doorways/DoorwaysList";
import SelectField from "../components/form/SelectField";
import QuoteSummary from "../components/quote/QuoteSummary";

export default function Home() {
  // Получение данных из БД
  const { materials, patterns, skirting, loading, error } = useDictionaries();

  // Состояния
  const [segments, setSegments] = useState([{ width_m: 3, length_m: 4 }]);
  const [materialId, setMaterialId] = useState(null);
  const [patternId, setPatternId] = useState(null);

  const [includeSkirting, setIncludeSkirting] = useState(false);
  const [skirtingId, setSkirtingId] = useState(null);
  const [doorways, setDoorways] = useState([]);

  // Сохранение в состояния ID выбранных элементов из БД
  useEffect(() => {
    if (materials[0] && !materialId) setMaterialId(String(materials[0].id));
    if (patterns[0] && !patternId) setPatternId(String(patterns[0].id));
    if (skirting[0] && !skirtingId) setSkirtingId(String(skirting[0].id));
  }, [materials, patterns, skirting]);

  // Объекты выбранного элемента из БД
  const material = useMemo(
    () => materials.find((m) => String(m.id) === String(materialId)),
    [materials, materialId]
  );
  const pattern = useMemo(
    () => patterns.find((p) => String(p.id) === String(patternId)),
    [patterns, patternId]
  );
  const skirt = useMemo(
    () => skirting.find((s) => String(s.id) === String(skirtingId)),
    [skirting, skirtingId]
  );

  // Расчеты
  const quote = useQuote({
    segments,
    material,
    pattern,
    includeSkirting,
    skirting: skirt,
    doorways,
  });

  if (loading)
    return <div className="element">Загрузка напольных покрытий…</div>;
  if (error)
    return (
      <div className="element error">Ошибка загрузки: {String(error)}</div>
    );

  return (
    <>
      <div className="left">
        <div className="element">
          <h2>Материалы</h2>
          <SelectField
            label="Материал"
            value={materialId}
            onChange={(value) => setMaterialId(value)}
            options={materials}
            getValue={(option) => String(option.id)}
            getLabel={(option) =>
              `${option.name} — ₽${option.price_per_m2}/м², пачка ${option.pack_m2} м²`
            }
          />
          <SelectField
            label="Схема укладки"
            value={patternId}
            onChange={(value) => setPatternId(value)}
            options={patterns}
            getValue={(option) => String(option.id)}
            getLabel={(option) =>
              `${option.name} — запас ${option.waste_percent}%`
            }
          />
        </div>

        <div className="element">
          <SegmentsList segments={segments} setSegments={setSegments} />
        </div>

        <div className="element">
          <h2>Плинтус</h2>
          <label className="field checkbox">
            <input
              type="checkbox"
              checked={includeSkirting}
              onChange={(e) => setIncludeSkirting(e.target.checked)}
            />
            <span>Учесть плинтус</span>
          </label>
          {includeSkirting && (
            <SelectField
              label="Тип плинтуса"
              value={skirtingId}
              onChange={(value) => setSkirtingId(value)}
              options={skirting}
              getValue={(option) => String(option.id)}
              getLabel={(option) =>
                `${option.name} — ₽${option.price_per_meter}/м, длина ${option.piece_length_m} м`
              }
            />
          )}
        </div>

        <div className="element">
          <DoorwaysList doorways={doorways} setDoorways={setDoorways} />
        </div>
      </div>

      <div className="right">
        <div className="element">
          <QuoteSummary quote={quote} />
        </div>
      </div>
    </>
  );
}
