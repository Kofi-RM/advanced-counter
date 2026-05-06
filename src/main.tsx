import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import AdvancedCounter from './AdvancedCounter.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <AdvancedCounter/>
  </StrictMode>,
)
