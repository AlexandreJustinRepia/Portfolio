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
  const [inertiaApp, setInertiaApp] = useState(null);

  useEffect(() => {
    // Start creating the Inertia app
    createInertiaApp({
      title: (title) => `${title} - ${appName}`,
      resolve: (name) =>
        resolvePageComponent(
          `./Pages/${name}.jsx`,
          import.meta.glob('./Pages/**/*.jsx'),
        ),
      setup({ App, props }) {
        // When the Inertia app is ready, store it and hide the loading screen
        setInertiaApp(<App {...props} />);
        setLoading(false);
      },
      progress: {
        color: '#ef4444', // Tailwind red-500
      },
    });
  }, []);

  if (loading) return <WelcomeLoadingScreen />;

  return inertiaApp;
}

root.render(<AppLoader />);
