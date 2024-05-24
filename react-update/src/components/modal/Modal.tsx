import { useModalsStore } from '@/states/modals';
import { IModal, IModalOptions, modalDefaultOptions } from '@/types/modal';
import { useCallback, useEffect, useRef, useState } from 'react';

export const Modal = ({
  options: defaultOptions,
  isOpened = false,
  onClose,
  onOpen,
  children,
  title,
}: IModal) => {
  const [body, setBody] = useState<HTMLElement>();
  const [isCloseButtonVisible, setIsCloseButtonVisible] = useState<boolean>();
  const blocker = useRef<HTMLDivElement>(null);
  const modal = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<IModalOptions>(defaultOptions);

  const { getCurrent, close: providerClose, isActive, selectCurrent } = useModalsStore();

  useEffect(() => {
    if (!document) return;

    setBody(document.body);

    setOptions({
      ...modalDefaultOptions,
      ...options,
      doFade: !isNaN(parseInt(options.fadeDuration, 10)),
    });
  }, [defaultOptions]);

  const block = useCallback(() => {
    if (!body) return;

    body.style.overflow = 'hidden';

    selectCurrent();

    if (options.doFade && blocker.current) {
      blocker.current.style.opacity = '0';
      blocker.current.animate([{ opacity: '0' }, { opacity: '1' }], {
        duration: +options.fadeDuration,
        fill: 'forwards',
      });
    }
  }, [blocker, body, options.doFade, options.fadeDuration, selectCurrent]);

  const unblock = useCallback(
    async (now: boolean = false) => {
      return new Promise((resolve) => {
        if (!body) return;

        if (!now && options.doFade && blocker.current) {
          blocker.current.style.opacity = '1';
          const animation = blocker.current.animate([{ opacity: '1' }, { opacity: '0' }], {
            duration: +options.fadeDuration,
            fill: 'forwards',
          });
          animation.onfinish = resolve;
        }

        selectCurrent();

        if (!isActive() && body) {
          body.style.overflow = '';
        }
      });
    },
    [body, isActive, options.doFade, options.fadeDuration, selectCurrent]
  );

  const show = useCallback(() => {
    if (!modal.current) return;

    if (options.showClose) {
      setIsCloseButtonVisible(true);
    }

    if (options.doFade) {
      modal.current.animate(
        [{ opacity: '0', display: 'inline-block' }, { opacity: '1' }],
        +options.fadeDuration
      );
    } else {
      modal.current.style.display = 'inline-block';
    }

    //  this.$elm.trigger($.modal.OPEN, [this._ctx()]);
  }, [options.doFade, options.fadeDuration, options.showClose]);

  const hide = useCallback(async () => {
    return new Promise((resolve) => {
      if (isCloseButtonVisible) setIsCloseButtonVisible(false);
      if (!modal.current) return;

      if (options.doFade) {
        modal.current.style.opacity = '1';
        const animation = modal.current.animate([{ opacity: '1' }, { opacity: '0' }], {
          duration: +options.fadeDuration,
          fill: 'forwards',
        });

        animation.onfinish = resolve;
      } else {
        modal.current.style.display = 'none';
      }
    });
  }, [isCloseButtonVisible, options.doFade, options.fadeDuration]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const current = getCurrent();
      if (event.code === 'Escape' && options.escapeClose && current) current.close();
    },
    [getCurrent, options.escapeClose]
  );

  const close = useCallback(() => {
    providerClose();

    // TODO: debug hide
    Promise.all([unblock()]).then(() => {
      if (onClose) onClose();
    });

    if (isActive()) {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, isActive, onClose, providerClose, unblock]);

  const open = useCallback(() => {
    block();
    if (options?.doFade) {
      setTimeout(() => {
        show();
      }, +options.fadeDuration * options.fadeDelay);
    } else {
      show();
    }
    document.removeEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleKeyDown);
    if (options.clickClose) {
      blocker.current?.addEventListener('click', (event: MouseEvent) => {
        if (event.target === blocker.current) {
          close();
        }
      });
    }

    if (onOpen) onOpen();
  }, [
    block,
    options?.doFade,
    options.clickClose,
    options.fadeDuration,
    options.fadeDelay,
    handleKeyDown,
    onOpen,
    show,
    close,
  ]);

  useEffect(() => {
    if (isOpened) {
      open();
      return;
    }

    close();
  }, [close, isOpened, open]);

  return (
    <div
      ref={blocker}
      className={`${
        options.blockerClass ?? ''
      } blocker current fixed inset-0 z-[9999] opacity-0 flex items-center justify-center bg-black/80`}>
      <div
        ref={modal}
        className={`${
          options.modalClass ?? ''
        } bg-white w-full max-w-lg h-fit max-h-[600px] rounded-lg shadow-lg`}>
        <header className='border-b border-black/20 p-4 flex items-center'>
          {title}

          {options.showClose && isCloseButtonVisible && (
            <button onClick={close} className={`close-modal ml-auto ${options.closeClass ?? ''}`}>
              <svg
                className='w-6 h-6 text-gray-800'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='none'
                viewBox='0 0 24 24'>
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M6 18 17.94 6M18 18 6.06 6'
                />
              </svg>
            </button>
          )}
        </header>

        <div className='p-4'>{children}</div>
      </div>
    </div>
  );
};
