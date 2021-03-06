import {useHistory} from 'react-router-dom'
import {auth, database, firebase } from '../services/firebase'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../components/Button'
import {FormEvent, useState} from 'react'
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'

export function Home() {
const history = useHistory();
const {user, signWithGoogle} = useAuth()
const [roomCode, setRoomCode] = useState('') 
async function handleCreateRoom() {
if(!user) {

    await signWithGoogle()
}


history.push('rooms/new')

}

async function handleJoinRoom(event: FormEvent) {

event.preventDefault();
// 32:44
if (roomCode === '') {

    return;
}

const roomRef = await database.ref(`rooms/${roomCode}`).get();
if (!roomRef.exists()) {

alert('room does not exists.');
 
return
}

history.push(`/rooms/${roomCode}`)
}


return(

<div id="page-auth">
<aside>
    <img src={illustrationImg} alt="symbol's illustration asks and answers" />
    <strong>Crie salas de Q&amp;A ao-vivo</strong>
    <p>Tire as dúvidas da sua audiência em tempo-real</p>
</aside>

<main>
 {/* <h1>{user?.name}</h1> NOME NA AUTENTICAÇÃO DO USUÁRIO DO GOOGLE*/}
<div className="main-content">
<img src={logoImg} alt="LetmeasK"/>

<button onClick={handleCreateRoom} className="create-room">

<img src={googleIconImg} alt="GoogleLogo" />
Crie sua sala com o Google
    
</button>
<div className="separator">ou entre numa sala</div>
<form onSubmit={handleJoinRoom}>
<input
 type="text" 
placeholder="Digite o código da sala"
onChange={event => setRoomCode(event.target.value)}
value={roomCode}
/>
<Button type="submit">
    Entrar na sala
</Button>


</form>
</div>
</main>
</div>//PAGE-AUTH


)

}   