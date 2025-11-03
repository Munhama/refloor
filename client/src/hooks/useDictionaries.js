import { useEffect, useState } from "react";
import { getMaterials, getPatterns, getSkirting } from "../api/endpoints";

export function useDictionaries() {
  const [materials, setMaterials] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [skirting, setSkirting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const [m, p, s] = await Promise.all([
          getMaterials(),
          getPatterns(),
          getSkirting(),
        ]);
        if (!alive) return;
        setMaterials(m);
        setPatterns(p);
        setSkirting(s);
      } catch (e) {
        if (!alive) return;
        setError(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return { materials, patterns, skirting, loading, error };
}
