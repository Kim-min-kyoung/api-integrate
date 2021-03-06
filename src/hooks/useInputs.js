import { useState } from 'react';
function useInputs(initialForm){
    const [ form, setForm ] = useState(initialForm);
    // change
    const onChange = (e) => {
        const { name, value } = e.target;
        setForm( form => ({...form, [name]: value}))
    }
    const reset = () => setForm(initialForm);
    return [form, onChange, reset];
}
export default useInputs;