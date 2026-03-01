// Create appointment-picker.d.ts in your project
declare module 'appointment-picker' {
    export default class AppointmentPicker {
      constructor(element: HTMLElement, options: any);
      open(): void;
      close(): void;
      destroy(): void;
    }
  }