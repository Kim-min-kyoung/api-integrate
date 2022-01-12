import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiUsers = () => {
    // 상태관리하기 1. 요청의 결과  2. 로딩상태  3. 에러
    const [ users, setUsers ] = useState(null);
    const [ loading, setLoading ] = useState(null);
    const [ error, setError ] = useState(null);
    const fetchUsers = async () => {
        try {
            // users초기화, error초기화, loading true
            setUsers(null);
            setError(null);
            setLoading(true);
            const response = await axios.get(
                'http://jsonplaceholder.typicode.com/users'
            )
            setUsers(response.data);
        }
        catch(e){
            // 에러번호를 확인하고싶다면
            console.log(e.response.status);
            setError(e);
        }
        setLoading(false);
    }// 렌더링 될 때 axios 사용해서 데이터를 받음
    useEffect(() => {
        fetchUsers();
    }, [])
    // 로딩중이라면?
    if(loading) return <div>로딩중...</div>
    // 에러가 발생했다면?
    if(error) return <div>에러가 발생했습니다.</div>
    if(!users) return null;
    return (
        <div>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}{user.name}</li>
                ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </div>
    );
};

export default ApiUsers;