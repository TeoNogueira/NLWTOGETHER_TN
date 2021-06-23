import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

 type buttonProps = ButtonHTMLAttributes<HTMLButtonElement>
 
export function Button(props: buttonProps) {



return (
    
    <button className="button" {...props}/>
      
    
)

}

//uso do spread {...}
//--------------x-------------------------x---------
// importação de toda tipagem para botão do html>>>>> import { ButtonHTMLAttributes} from 'react'
//ButtonHTMLAttributes<HTMLButtonElement>
//--------------x-------------------------x---------