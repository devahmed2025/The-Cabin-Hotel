import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
// react query and devtools
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//toast
import { Toaster } from 'react-hot-toast';

import Account from './pages/Account';

import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import GlobalStyles from './styles/GlobalStyles';
import Users from './pages/Users';
import AppLayout from './ui/AppLayout';
import BookingDetail from './features/bookings/BookingDetail';
import CheckIn from './pages/CheckIn';
import CheckOut from './pages/CheckOut';
import ProtectedRoute from './ui/ProtectedRoute';
import { DarkModeProvider } from './context/DarkModeContext';
import { SuspenseFallback } from './ui/SuspenseFallback';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      // staleTime: 60 * 1000, // دا يخليها دايمًا stale = لازم refetch so we refetch evey 60 sec if needed how long untill data is stale old
      staleTime: 0, // دا يخليها دايمًا stale = لازم refetch so we refetch evey 60 sec if needed how long untill data is stale old

      refetchOnWindowFocus: true, // يعمل refetch لما ترجع على التبويب
      refetchOnMount: true, // يعمل refetch لما تركب الكمبوننت
      refetchOnReconnect: true, // يعمل refetch بعد الرجوع من قطع النت
    },
  },
});
function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontSize: '1.4rem',
              maxWidth: '500px',
              padding: '1.6rem 2.4rem',
              backgroundColor: '#333',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#1e1e1e',
              },
            },
          }}
        />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            {/* // to make this the first compoennt we see when we go to the site index and replace */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Navigate replace to="/dashboard" />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route
                path="/dashboard"
                element={
                  <SuspenseFallback>
                    <Dashboard />
                  </SuspenseFallback>
                }
              />
              <Route path="/account" element={<Account />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/:id" element={<BookingDetail />} />
              <Route path="/checkin/:id" element={<CheckIn />} />
              <Route path="/checkout/:id" element={<CheckOut />} />

              <Route path="/cabins" element={<Cabins />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<Users />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
