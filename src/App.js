import './App.css';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import useInputs from './hooks/useInputs';
import React, { useRef, useReducer } from 'react';

const initialState = {
  inputs: {
    username : '',
    userage : '',
  },
  users: [
    {id:1, username:"김그린", age:30, member: false},
    {id:2, username:"이그린", age:30, member: false},
    {id:3, username:"박그린", age:30, member: false},
    {id:4, username:"최그린", age:30, member: false},
    {id:5, username:"서그린", age:30, member: false}
  ]
}
function reducer(state, action) { //04
  switch(action.type){
    // case 'CHANGE_INPUT':
    //   return {
    //     ...state,
    //     inputs: {
    //       ...state.inputs,
    //       [action.name]: action.value
    //     }
    //   };
      case 'CREATE_USER':
        return {
          // inputs: state.inputs,
          users: [
            ...state.users,
            action.user
          ]
        }
      case 'MEMBER_TOGGLE':
        return {
          // inputs: state.inputs,
          users: state.users.map(user =>
          user.id === action.id ? {...user, member: !user.member } : user
          )
        }
      case 'MEMBER_DELETE':
        return {
          // inputs: state.inputs,
          users: state.users.filter(user => user.id !== action.id)
        }
      default:
        return state;
  };
} //01 바깥으로 빼줌.

// UserDispatch라는 Context를 생성하고 내보내기
export const UserDispatch = React.createContext(null);

function App() {
  const [ { username, userage }, onChange, reset ] = useInputs({
    username: '',
    userage: ''
  })
  const [ state, dispatch ] = useReducer(reducer, initialState); //02
  const { users } = state; //02
  // const { username, userage }= state.inputs; //02
  const nextId = useRef(6);
  // function onChange(e){ //03 onchange살려서 disptch로 넘겨주기
  //   const { name, value } = e.target;
  //   //e.target을 하면 어느 input인지 구별할수있도록
  //   console.log(name,value);
  //   dispatch({
  //     type: 'CHANGE_INPUT',
  //     username:name,
  //     value:value
  //   })
  // }
  function onCreate(){
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username: username,
        age: userage
      }
    })
    nextId.current = nextId.current + 1;
  }
  // function onToggle(id){
  //   dispatch({
  //     type: 'MEMBER_TOGGLE',
  //     id: id
  //   })
  // }
  // function onDelete(id) {
  //   dispatch({
  //     type: 'MEMBER_DELETE',
  //     id: id
  //   })
  // }
  return (
    <UserDispatch.Provider value={dispatch}>
      <div className="App">
        <CreateUser username={username} userage={userage} onChange={onChange} onCreate={onCreate} />
        <UserList users={users} />
      </div>
    </UserDispatch.Provider>
  );
}

export default App;
