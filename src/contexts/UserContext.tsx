'use client';

import React, { createContext, useContext } from 'react';
import { useFarcasterUser, FarcasterUser } from '@/hooks/useFarcasterUser';

interface UserContextType {
  user: FarcasterUser | null;
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, loading, error } = useFarcasterUser();

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
