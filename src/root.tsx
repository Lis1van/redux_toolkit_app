import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'

const Root = () => (
    <div>
        <Outlet />
        <ScrollRestoration
            getKey={(location) => {
                const paths = ['/']
                return paths.includes(location.pathname)
                    ? location.pathname
                    : location.key
            }}
        />
    </div>
)

export default Root
