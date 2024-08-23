import React, { useState } from 'react'

import SearchTrigger from './components/SearchTrigger'
import SearchPopup from './components/SearchPopup'

/**
 * Управляет импортом/экспортом компонента SearchPopup.
 * вместе с модальным компонентом, который будет обрабатывать поиск пользователей
 * запрос и отображение всех результатов
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
