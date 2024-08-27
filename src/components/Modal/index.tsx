import React, { useRef, useEffect, useCallback } from 'react'

import CloseIcon from 'assets/svg/CloseIcon'

import styles from './Modal.module.scss'

type Props = {
    children?: React.ReactNode
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}


const Modal = ({
    children = null,
    isOpen = false,
    setIsOpen = () => {},
}: Props) => {
    const contentRef = useRef<HTMLDivElement>(null)

    const handleOutsideClick = useCallback(
        (e: MouseEvent) => {
            if (
                contentRef.current &&
                !contentRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false)
            }
        },
        [setIsOpen]
    )

    const handleEscape = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        },
        [setIsOpen]
    )

    const onCloseButtonClick = () => {
        setIsOpen(false)
    }


    useEffect(() => {
        document.addEventListener('keydown', handleEscape)
        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [setIsOpen, handleEscape, handleOutsideClick])

    if (!isOpen) {
        return null
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContainer_content} ref={contentRef}>
                <CloseIcon
                    className={styles.close}
                    onClick={onCloseButtonClick}
                />
                {children}
            </div>
        </div>
    )
}

export default React.memo(Modal)
