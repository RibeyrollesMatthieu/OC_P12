import { ReactNode } from 'react';

export interface IModalOptions {
  fadeDuration: string;
  fadeDelay: number;
  doFade?: boolean;
  closeExisting?: boolean;
  escapeClose?: boolean;
  showClose?: boolean;
  closeClass?: string;
  closeText?: string;
  modalClass?: string;
  clickClose?: boolean;
  blockerClass?: string;
}

export interface IModal {
  options: IModalOptions;
  isOpened: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  children?: ReactNode;
  title?: string;
}

export const modalDefaultOptions: IModalOptions = {
  closeExisting: true,
  escapeClose: true,
  clickClose: true,
  closeText: 'Close',
  closeClass: '',
  modalClass: 'modal',
  blockerClass: 'jquery-modal',
  showClose: true,
  fadeDuration: '', // Number of milliseconds the fade animation takes.
  fadeDelay: 1.0, // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
};

export type IModals = IModal[];