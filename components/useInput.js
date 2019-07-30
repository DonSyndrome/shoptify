import React from 'react';

const toFindBetterName = ({object:{inputName,SetValue,Value}}) => {
        return (
            <div className={'input-group'} >
                <label htmlFor={inputName}>
                    {inputName}
                </label>
                <input 
                key={inputName}
                type="text"
                name={inputName}
                id={inputName}
                value={Value}
                onChange={(e)=>{SetValue(e.target.value)}}
                />
            </div>
        )
};
export default toFindBetterName