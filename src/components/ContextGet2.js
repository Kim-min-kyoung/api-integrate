import { useContext } from 'react';
import PersonContext from '../contexts/PersonContext';

export default function ContextGet2(){
    const persons = useContext(PersonContext);
    return(
        <ul>
            {persons.map((person) => (
                <li>{person.name}이고 나이는 {person.age}이다.</li>
            ))}
        </ul>
    );
}