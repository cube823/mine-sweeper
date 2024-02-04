import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from './store'
import GlobalStyles from './style/globalCss'
import { ThemeProvider } from 'styled-components'
import theme from './style/theme'

const persistor = persistStore(store)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyles />
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
