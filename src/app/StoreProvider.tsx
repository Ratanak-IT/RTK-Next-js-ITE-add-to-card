'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import { initializeCount } from '@/lib/features/countSlice/countSlice'

export default function StoreProvider({
    count,
  children,
}: {
    count : number,
  children: React.ReactNode
}) {
   const storeRef = useRef<AppStore | null>(null);
  // eslint-disable-next-line react-hooks/refs
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // eslint-disable-next-line react-hooks/refs
    storeRef.current.dispatch(initializeCount(count));
  }

  // eslint-disable-next-line react-hooks/refs
  return <Provider store={storeRef.current}>{children}</Provider>
}