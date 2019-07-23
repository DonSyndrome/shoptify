import React, { useState } from 'react';

const toFindBetterName = (inputName,[Value,SetValue]) => {
    return [() => {
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
                onChange={(e)=>(SetValue(e.target.value))}
                />
            </div>
        )},Value]
};
export default toFindBetterName