'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useFarcasterUser, FarcasterUser } from '@/hooks/useFarcasterUser';

interface UserContextType {
  user: FarcasterUser | null;
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  error: null,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const { user, loading, error } = useFarcasterUser();

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}


