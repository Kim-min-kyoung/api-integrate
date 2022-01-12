import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import useAsync from './useAsync';

// LOADING, SUCCESS, ERROR
function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            };
        default:
            throw new Error(`error`);
    }
}

// useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에,
// 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만들었습니다.
async function getUsers() {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    )
    return response.data;
}

function ApiUsersReducer() {
    // 상태관리하기
    // useReducer(함수, 초기값)
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });
    const fetchUsers = async () => {
        // 로딩을 시작할때
        try {
            // users초기화, error초기화, loading은 ture
            dispatch({ type: 'LOADING '});
            const response = await axios.get(
                'http://jsonplaceholder.typicode.com/users'
            );
            // 요청이 성공했을 때
            dispatch({ type: 'SUCCESS', data: response.data });
        }
        catch(e) {
            dispatch({ type: 'ERROR', error: e });
        }
    }
    // 렌더링 될 때 호출
    useEffect(() => {
        fetchUsers();
    });

    const [ state, refetch ] = useAsync(getUsers, [], true);
    const { loading, error, data: users } = state; // state.data 를 users 키워드로 조회
    // 로딩중이라면?
    if(loading) return <div>로딩중...</div>;
    // 에러가 발생했다면?
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!users) return null;
    return (
        <div>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}{user.name}</li>
                ))}
            </ul>
            <button onChange={refetch}>다시 불러오기</button>
        </div>
    );
}

export default ApiUsersReducer;