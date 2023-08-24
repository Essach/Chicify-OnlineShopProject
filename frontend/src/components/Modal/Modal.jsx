import ReactDOM from 'react-dom';

import './Modal.scss';

import { useEffect, useRef } from 'react';

const Modal = (
    { children,
        handleOnClose,
        isOpen,
        shouldBeClosedOnOutsideClick,
    }) => {
    const modalRef = useRef(null);
    const previousActiveElement = useRef(null)

    useEffect(() => {
        if (!modalRef.current) {
            return;
        }

        const { current: modal } = modalRef;

        if (isOpen) {
            previousActiveElement.current = document.activeElement;
            modal.showModal();
        } else if (previousActiveElement.current) {
            modal.close();
            previousActiveElement.current.focus()
        }
    }, [isOpen]);

    useEffect(() => {
        const { current: modal } = modalRef;
        
        const handleCancel = event => {
            event.preventDefault();
            handleOnClose();
        };

        modal.addEventListener('cancel', handleCancel);

        return () => {
            modal.removeEventListener('cancel', handleCancel)
        }
    }, [handleOnClose])

    const handleOutsideClick = (event) => {
        const { current } = modalRef;
        
        if (shouldBeClosedOnOutsideClick && event.target === current) {
            handleOnClose();
        }
    }

    return ReactDOM.createPortal((
        <dialog ref={modalRef} className='modal' onClick={handleOutsideClick}>
            {children}
        </dialog>
    ), document.body);
}

export default Modal;