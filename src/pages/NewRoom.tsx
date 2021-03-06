import {Link, useHistory} from 'react-router-dom';
import { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

// import {useContext} from 'react'
// import {AuthContext} from '../contexts/AuthContext'


export function NewRoom() {
// const { user } = useAuth()
const history = useHistory()
const [newRoom, setNewRoom] = useState('');

async function handleCreateRoom(event: FormEvent) {

    event.preventDefault()

if (newRoom.trim() === '') {
return;
}

const roomRef = database.ref('rooms');

const firebaseRoom = await roomRef.push({
    title: newRoom,
    authorId: user?.id,

}) //jogando a informação pra dentro do 'rooms'

history.push(`/rooms/${firebaseRoom.key}`)
}

const { user } = useAuth()
// STOPPED 1:18:10 AULA 02
return(

<div id="page-auth">
<aside>
    <img src={illustrationImg} alt="symbol's illustration asks and answers" />
    <strong>Crie salas de Q&amp;A ao-vivo</strong>
    <p>Tire as dúvidas da sua audiência em tempo-real</p>
</aside>

<main>
   
<div className="main-content">
<img src={logoImg} alt="LetmeasK"/>
<h2>Criar uma nova sala</h2>
<h1>{user?.name}</h1> 
<form onSubmit={handleCreateRoom}>
<input
 type="text" 
placeholder="Nome da sala"
onChange={event => setNewRoom(event.target.value)}
value={newRoom}

/>
<Button type="submit">
    Criar sala
</Button>


</form>
<p className="paragraph">
Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
</p>
</div>
</main>
</div>//PAGE-AUTH


)

}