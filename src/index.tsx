import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './root'
import './index.css'

import PokemonIdAbilitiesPage from 'pages/pokemon/[id]/abilities'

const IndexPage = React.lazy(() => import('pages/index'))
const ErrorPage = React.lazy(() => import('pages/error'))
const PokemonIdLayout = React.lazy(() => import('layouts/PokemonIdLayout'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <IndexPage />,
            },
            {
                element: <PokemonIdLayout />,
                children: [
                    {
                        path: 'pokemon/:id/',
                    },
                    {
                        path: 'pokemon/:id/abilities',
                        element: <PokemonIdAbilitiesPage />,
                    },
                ],
            },
        ],
    },
])

const rootElement: HTMLElement | null = document.getElementById('root')

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)

    root.render(
        <Provider store={store}>
            <Suspense fallback={null}>
                <PersistGate loading={null} persistor={persistor}>
                    <RouterProvider router={router} />
                </PersistGate>
            </Suspense>
        </Provider>
    )
}
