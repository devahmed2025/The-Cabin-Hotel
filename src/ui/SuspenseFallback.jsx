// src/ui/SuspenseFallback.jsx
import { Suspense } from 'react';
import Spinner from './Spinner';

export function SuspenseFallback({ children }) {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}
