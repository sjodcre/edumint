import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { registerSW } from 'virtual:pwa-register';
import { ScreenProvider } from './context/ScreenContext';
// import { ArweaveWalletKit } from '@arweave-wallet-kit/react';
// import ArConnectStrategy from '@arweave-wallet-kit/arconnect-strategy';

registerSW();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> 
    <ScreenProvider>
 {/* <ArweaveWalletKit
        config={{
          permissions: [
            "ACCESS_ADDRESS",
            "ACCESS_PUBLIC_KEY",
            "SIGN_TRANSACTION",
            "DISPATCH",
          ],
          ensurePermissions: true,
          strategies: [new ArConnectStrategy()],
        }}
        theme={{
          displayTheme: "dark",
        }}
      > */}
      <App/>
    {/* </ArweaveWalletKit> */}
    </ScreenProvider>
  </React.StrictMode>,
)
