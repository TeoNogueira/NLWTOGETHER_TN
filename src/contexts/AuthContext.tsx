import { type } from "os";
import { createContext, useState, useEffect, ReactNode } from 'react';
import {auth, firebase} from '../services/firebase'

export const AuthContext = createContext({} as AuthContextType)

type User = {
    id: string;
    name: string;
    avatar: string
    
    }
    
    type AuthContextType = {
    user: User | undefined;
    signWithGoogle: () => Promise<void>;
    
    }

    type AuthContextProvideProps = {
       children: ReactNode;

    }


export function AuthContextProvider(props: AuthContextProvideProps) {
    const [user, setUser ] = useState<User>() // iniciar como undefined pois não existe usuário logado

    //MANTENDO O USUÁRIO LOGADO NA PÁGINA MESMO SE ELA ATUALIZAR! 

    useEffect(() => {
    /*EventListener*/const unsubscribe = auth.onAuthStateChanged(user => {
    
      if(user) {
      const { displayName, photoURL, uid } = user
      
      if(!displayName || !photoURL) {
    
        throw new Error('Missing Information from Google Account.');
    
      }
    
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
    
      })
      }
    }) 
    
    return() => {
    
    unsubscribe()
    }
    
    }, [])
     
    // FUNÇÃO DE LOGIN // AUTENTICAÇÃO NA DOM COM O FIREBASE
    async function signWithGoogle() { 
      const provider = new firebase.auth.GoogleAuthProvider();
    const result =  await auth.signInWithPopup(provider);
    
        if(result.user) {
          const { displayName, photoURL, uid } = result.user
      
        if(!displayName || !photoURL) {
    
          throw new Error('Missing Information from Google Account.');
    
        }
    
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
    
        })
      }
    
    }
//inserindo dentro das rotas no App.tsx
return(
<AuthContext.Provider value={{user, signWithGoogle}}>

{props.children}

</AuthContext.Provider>


); 


}