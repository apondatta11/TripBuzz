import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/router'
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from './provider/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

import "aos/dist/aos.css";
import Aos from "aos";

const queryClient = new QueryClient;

Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="top-center" />
        <ToastContainer></ToastContainer>
          <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
)

