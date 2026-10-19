export type ToastTone = 'success' | 'info';
export interface ToastDetail {
  message: string;
  tone: ToastTone;
}

export function toast(message: string, tone: ToastTone = 'success') {
  window.dispatchEvent(new CustomEvent<ToastDetail>('app:toast', { detail: { message, tone } }));
}
