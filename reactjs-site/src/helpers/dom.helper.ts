export function lockBodyScroll(locked: boolean): void {
  document.body.style.overflow = locked ? 'hidden' : '';
}
