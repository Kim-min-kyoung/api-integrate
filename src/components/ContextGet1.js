import PersonContext from "../contexts/PersonContext";
export default function ContextGet1(){
    return(
        <PersonContext.Consumer>
            {(persons) => (
                <ul>
                    {persons.map((perosn) => (
                        <li>{perosn.name}</li>
                    ))}
                </ul>
            )}
        </PersonContext.Consumer>
    );
}