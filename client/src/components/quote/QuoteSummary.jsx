import "./quote.scss";

export default function QuoteSummary({ quote }) {
  if (!quote) return null;
  return (
    <>
      <h2>Итоги</h2>
      <ul className="quote">
        <li>
          <span>Площадь</span>
          <b>{quote.area_m2} м²</b>
        </li>
        <li>
          <span>С учётом запаса</span>
          <b>{quote.area_with_waste_m2} м²</b>
        </li>
        <li>
          <span>Упаковок</span>
          <b>{quote.packs}</b>
        </li>
        <li>
          <span>Материал (м²)</span>
          <b>{quote.material_area_m2} м²</b>
        </li>
        <li>
          <span>Стоимость материала</span>
          <b>{quote.material_cost} ₽</b>
        </li>
        {"skirting_cost" in quote && (
          <>
            <li>
              <span>Плинтус, м</span>
              <b>{quote.skirting_run_m} м</b>
            </li>
            <li>
              <span>Отрезков</span>
              <b>{quote.skirting_pieces}</b>
            </li>
            <li>
              <span>Стоимость плинтуса</span>
              <b>{quote.skirting_cost} ₽</b>
            </li>
          </>
        )}
        <li className="total">
          <span>Итого</span>
          <b>{quote.total_cost} ₽</b>
        </li>
      </ul>
    </>
  );
}
