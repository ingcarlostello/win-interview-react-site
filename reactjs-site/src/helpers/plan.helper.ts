// Etiqueta legible de un plan: "free" -> "Free".
export function planLabel(planId: string): string {
  if (!planId) return 'Free';
  return planId.charAt(0).toUpperCase() + planId.slice(1);
}
