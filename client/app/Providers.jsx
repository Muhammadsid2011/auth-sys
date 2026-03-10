import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/redux/store'
import { GoogleOAuthProvider } from '@react-oauth/google'

function Providers({ children }) {

  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

  return (
    <ReduxProvider store={store}>
      <GoogleOAuthProvider clientId={CLIENT_ID  }>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </GoogleOAuthProvider>
    </ReduxProvider>
  )
}

export default Providers;
