type ButtonProps = {

text?: string; //a interrogação deixa como opcional a tipagem, em app.tsx não será obrigatório usar text em todos os buttons<<

//como declarar array com strings:
// text?: Array<string> ou text?: string[]
}


export function Button(props: ButtonProps) {




return (
    
    <button>{props.text || 'Default'}</button>
    
)


}

//tudo são components, propriedades e estados;

