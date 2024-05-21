'use client'
import { useSession } from 'next-auth/react';
import { createContext, useState, FC, ReactNode, useEffect } from 'react';

// Definición de tipos para la información del usuario
type UserData = {
  id?: number;
  email: string;
  premium:boolean;
  // Agrega más propiedades según sea necesario
};

// Definición del tipo del contexto
type UserContextType = {
  usuario: UserData | null;
  setUsuario: (usuario: UserData | null) => void;
};

// Creación del contexto
export const UserContext = createContext<UserContextType>({
  usuario: null,
  setUsuario: () => {},
});

// Proveedor de contexto
export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<UserData | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      setUsuario({
        ...session.user,
        email: session.user.email,
        premium: false
      });
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
};
