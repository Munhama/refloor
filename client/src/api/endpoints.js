import { api } from "./client";

export const getMaterials = () => api.get("/materials").then((r) => r.data);
export const getPatterns = () => api.get("/patterns").then((r) => r.data);
export const getSkirting = () => api.get("/skirting").then((r) => r.data);
export const getHealth = () => api.get("/health").then((r) => r.data);
