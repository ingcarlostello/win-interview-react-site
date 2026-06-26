export interface ScaleResult {
  scale: number;
}

export function calcScaleFit(
  containerWidth: number,
  containerHeight: number,
  contentWidth: number,
  contentHeight: number,
  factor = 0.95,
): ScaleResult {
  if (containerWidth <= 0 || containerHeight <= 0) {
    return { scale: 0 };
  }
  const scale = Math.min(containerWidth / contentWidth, containerHeight / contentHeight) * factor;
  return { scale };
}
