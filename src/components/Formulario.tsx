import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import useSelectMonedas from '../hooks/useSelectMonedas';
import React, { useState, useEffect } from 'react';
import { Monedas, monedas } from '../data/monedas';
import { MonedasType } from '../App';

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
    margin-top: 30px;    
    &:hover {
        background-color: #7A7DFF;
        cursor: pointer;
    }
`

const Formulario: React.FC<IProsFormulario> = ({setMonedas}) => {

    const [criptos, setCriptos] = useState<Monedas[]>()
    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas);
    const [criptoMoneda, SelectCriptoMonedas] = useSelectMonedas('Elige tu criptomoneda', criptos);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if([moneda, criptoMoneda].includes('')){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Los campos son obligatorios',
              })
              return;
        }
        setMonedas({moneda, criptoMoneda})
    }

    useEffect ( () => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';

            const res = await fetch(url);
            const json = await res.json();

            const arrayCriptos = json.Data.map( (cripto: { CoinInfo: { Name: string, FullName: string} }) => {
                const objeto = {id: cripto.CoinInfo.Name, nombre: cripto.CoinInfo.FullName};
                return objeto;
        });

        setCriptos(arrayCriptos);


        }
        consultarAPI();
    }, [])

    return ( 
        <form onSubmit={handleSubmit}>
            <SelectMonedas />
            <SelectCriptoMonedas />
            <InputSubmit 
                type='submit' 
                value='Cotizar' 
            />
        </form>
    )
}
 
export default Formulario;

interface IProsFormulario{
    setMonedas: React.Dispatch<React.SetStateAction<{}>>
}