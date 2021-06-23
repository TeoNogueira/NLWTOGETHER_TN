import {useHistory} from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../components/Button'


import '../styles/auth.scss'

export function Home() {
const history = useHistory();

function navigateToNewRoom() {

history.push('rooms/new')

}

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

<button onClick={navigateToNewRoom} className="create-room">

<img src={googleIconImg} alt="GoogleLogo" />
Crie sua sala com o Google
    
</button>
<div className="separator">ou entre numa sala</div>
<form action="">
<input
 type="text" 
placeholder="Digite o código da sala"
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