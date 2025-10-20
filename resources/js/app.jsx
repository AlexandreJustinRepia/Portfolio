import '../css/app.css';
import './bootstrap';
import 'aos/dist/aos.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import WelcomeLoadingScreen from './Components/WelcomeLoadingScreen';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const rootEl = document.getElementById('app');
const root = createRoot(rootEl);

function AppLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <WelcomeLoadingScreen onFinish={() => setLoading(false)} />;

    return (
        createInertiaApp({
            title: (title) => `${title} - ${appName}`,
            resolve: (name) =>
                resolvePageComponent(
                    `./Pages/${name}.jsx`,
                    import.meta.glob('./Pages/**/*.jsx'),
                ),
            setup({ el, App, props }) {
                root.render(<App {...props} />);
            },
            progress: {
                color: '#ef4444', // Tailwind red-500
            },
        })
    );
}

root.render(<AppLoader />);
