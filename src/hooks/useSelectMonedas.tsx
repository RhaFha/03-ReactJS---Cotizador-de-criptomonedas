import styled from '@emotion/styled';

const Label = styled.label`
    color: #FFF;
`

const useSelectMonedas = () => {
    const SelectMonedas = ({}) => (
        <>
            <Label>{label}</Label>
        </>
    )

    return [SelectMonedas]
}
 
export default useSelectMonedas;

interface IPropsSelectMonedas{
    label: string
}