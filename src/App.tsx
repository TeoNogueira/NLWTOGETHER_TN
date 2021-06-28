// import { Button } from './components/Button'
// APP COMPONENTE PRINCIPAL

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import {BrowserRouter, Route} from 'react-router-dom'
import { createContext, useState } from 'react'
import { firebase, auth } from './services/firebase'
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

function App() { 
const [user, setUser ] = useState<User>() // iniciar como undefined pois não existe usuário logado
 
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
  return (
    
    <BrowserRouter>
    <AuthContext.Provider value={{user, signWithGoogle}}>
   <Route path="/" exact component={Home} />
   <Route path="/rooms/new" component={NewRoom} />
   </AuthContext.Provider>
    </BrowserRouter>
    
  );
}

export default App;
