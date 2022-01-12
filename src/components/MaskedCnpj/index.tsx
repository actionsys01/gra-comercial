import React from 'react';
import InputMask from 'react-input-mask';

interface MaskedProps {
    value: any,
    onChange: (event: any) => void
}

const MaskedCnpj = ({value, onChange} : MaskedProps) => {
    

    return <>
        <InputMask 
        mask='99.999.999/9999-99'
        value={value}
        onChange={onChange}
        />
    </>
}

export default MaskedCnpj 