const round2 = (n) => Math.round(n * 100) / 100;

export function calculateQuote({
  segments,
  material,
  pattern,
  includeSkirting,
  skirting,
  doorways = [],
}) {
  // Расчет площади
  const totalArea = segments.reduce(
    (sum, s) => sum + (Number(s.width_m) || 0) * (Number(s.length_m) || 0),
    0
  );

  // Расчет запаса
  const wasteK = 1 + (Number(pattern?.waste_percent) || 0) / 100;
  const areaWithWaste = totalArea * wasteK;

  // Расчет количества и стоимости материала
  const packSize = Number(material?.pack_m2) || 1;
  const packs = Math.ceil(areaWithWaste / packSize);
  const materialArea = packs * packSize;
  const materialCost = round2(
    materialArea * (Number(material?.price_per_m2) || 0)
  );

  // Расчет периметра для плинтуса
  let perimeter = segments.reduce(
    (sum, s) =>
      sum + 2 * ((Number(s.width_m) || 0) + (Number(s.length_m) || 0)),
    0
  );

  // Вычитаем дверные проёмы
  const doorwayRun = doorways.reduce(
    (sum, d) => sum + (Number(d.width_m) || 0) * (Number(d.count) || 1),
    0
  );
  perimeter = Math.max(0, perimeter - doorwayRun);

  // Расчет количества и стоимости плинтуса
  let skirtingCost = 0;
  let pieces = 0;
  const pieceLen = Number(skirting?.piece_length_m) || 0;
  if (includeSkirting && pieceLen > 0) {
    pieces = Math.ceil(perimeter / pieceLen);
    const run = pieces * pieceLen;
    skirtingCost = round2(run * (Number(skirting?.price_per_meter) || 0));
  }

  // Объект результатов расчетов по материалом
  const totals = {
    area_m2: round2(totalArea),
    area_with_waste_m2: round2(areaWithWaste),
    packs,
    material_area_m2: round2(materialArea),
    material_cost: materialCost,
  };

  // Добавляем в объект результатов плинтус, если он выбран
  if (includeSkirting) {
    Object.assign(totals, {
      skirting_run_m: round2(pieces * pieceLen),
      skirting_piece_length_m: pieceLen,
      skirting_pieces: pieces,
      skirting_cost: skirtingCost,
    });
  }

  return {
    ...totals,
    total_cost: round2(materialCost + (skirtingCost || 0)),
  };
}
