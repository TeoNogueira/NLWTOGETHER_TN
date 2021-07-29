import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import {useParams} from 'react-router-dom'

import '../styles/room.scss'
import { FormEvent, useEffect, useState, } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

type RoomParams = {

    id: string;
}

export function Room() {
const {user} = useAuth()
const params = useParams<RoomParams>();
const [newQuestion, setNewQuestion] = useState('');

const roomId = params.id;

useEffect(() => {
console.log(roomId) 
const roomRef = database.ref(`rooms/${roomId}`)

roomRef.once('value', room => { 

    // console.log(room.val());//*Ouvindo um Evento de dentro do Firebase uma única vez, caso varias seria: "roomRef.on()" */
})

}, [roomId]) /*Lembrando que o array vazio significa que executará o hook uma única vez */

async function handleSendQuestion(event: FormEvent) {

event.preventDefault();

    if(newQuestion.trim() === '') {

        return;
    }

    if(!user) {

        throw new Error('You must be logged in')
    }

const question = {

content: newQuestion,
author: {
name: user?.name,
avatar: user.avatar,


},

isHighLighted: false,
isAnswered: false,
};

await database.ref(`rooms/${roomId}/questions`).push(question)


setNewQuestion('');//Deixando o campo do formulário pós-enviado-ficar-limpo

}
return(

<div id="page-room">

<header>
    <div className="content">
<img src={logoImg} alt="LetMeAsk" />
<RoomCode code={roomId}/>
    </div>

</header>
 <main className="content">
<div className="room-title">

    <h1>Sala React</h1>

    <span>4 perguntas</span>
</div>

<form onSubmit={handleSendQuestion}>
    <textarea placeholder="O que você quer perguntar?"
    onChange={event => setNewQuestion(event.target.value)}
    value={newQuestion}
    >
      
    </textarea>
    <div className="form-footer">
        {user ? (

            <div className="user-info">
             <img src={user.avatar} alt={user.name} />
             <span>{user.name}</span>
            </div>
        ) : (
          
        <span>Para enviar uma pergunta, <button>faça seu login.</button></span>

        ) 
        }

        {/* ----x----x-- */}

        <Button type="submit" disabled={!user}>Enviar Pergunta</Button>

    </div>
</form>

 </main>
</div>

)

}