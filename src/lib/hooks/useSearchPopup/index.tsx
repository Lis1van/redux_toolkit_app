import React, { useState } from 'react'

import SearchTrigger from './components/SearchTrigger'
import SearchPopup from './components/SearchPopup'

/**
 * Handles the importing/exporting of the SearchPopup component
 * along with the Modal component which will handle the users search
 * query and display all results
 * @return {SearchTrigger, SearchPopup}
 */
const useSearchPopup = () => {
    const [isOpen, setIsOpen] = useState(false)

    return {
        SearchTrigger: ({ className = '' }: { className?: string }) => (
            <SearchTrigger setIsOpen={setIsOpen} className={className} />
        ),
        SearchPopup: () => (
            <SearchPopup isOpen={isOpen} setIsOpen={setIsOpen} />
        ),
    }
}

export default useSearchPopup
