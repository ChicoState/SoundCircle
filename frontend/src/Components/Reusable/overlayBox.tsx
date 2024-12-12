import React, { useState } from 'react'

interface OverlayProps {
    classNameBG?: string
    classNameBox?: string
    isVisible: boolean
    onOutsidePress: () => void
    children: React.ReactNode
}

const Overlay: React.FC<OverlayProps> = ({ classNameBG, classNameBox, isVisible, onOutsidePress, children }) => {
    if (!isVisible) return null

    return (
        <div
        className={classNameBG ? classNameBG : `fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50` }
        onClick={onOutsidePress}
        >
            <div
            className={classNameBox ? classNameBox : `bg-white rounded-lg shadow-lg` }
            onClick={(e) => e.stopPropagation() } // Prevent backdrop click from closing the overlay when we click inside
            >
                {children}
            </div>
        </div>
    )
}

export default Overlay