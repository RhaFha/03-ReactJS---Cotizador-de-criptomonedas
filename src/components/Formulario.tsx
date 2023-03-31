import styled from '@emotion/styled';
import useSelectMonedas from '../hooks/useSelectMonedas';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    
    &:hover {
        background-color: #7A7DFF;
        cursor: pointer;
    }
`

const Formulario = () => {

    const [SelectMonedas] = useSelectMonedas('Elige tu moneda');

    return ( 
        <form>
            <SelectMonedas />
            <InputSubmit 
                type='submit' 
                value='Cotizar' 
            />
        </form>
    )
}
 
export default Formulario;