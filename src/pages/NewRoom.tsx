import {Link} from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../components/Button'
import {useContext} from 'react'
import {AuthContext} from '../App'


export function NewRoom() {
const { user } = useContext(AuthContext)
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
<form action="">
<input
 type="text" 
placeholder="Nome da sala"
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