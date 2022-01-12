import { useReducer, useEffect } from 'react';

// LOADING, SUCCESS, ERROR
function reducer(state, action){
    switch(action.type) {
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
                error: action.error
            }
        default:
            return state;
    }
}
// callback은 api를 호출하는 함수(apiuserreducer에서 다운로드 받는 함수)
// deps는 값이 변경되었을 때 넣어줌
function useAsync (callback, deps=[], skip=false) {
    // 상태관리하기
    // useReducer(함수, 초기값)
    const [ state, dispatch ] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });
    const fetchData = async () => {
        // users초기화, error초기화, loading true
        try {
            dispatch({ type: 'LOADING' });
            // 비동기 전송은 await 붙여줌
            const data = await callback();
            // 요청이 성공했을 때
            dispatch({ type: 'SUCCCESS', data });
        }
        catch(e){
            // 에러번호를 확인하고싶다면
            console.log(e.response.status);
            dispatch({ type: 'ERROR', error: e });
        }
    }
    // 렌더링 될 때 호출
    useEffect(() => {
        fetchData();
    }, []);
    return [state, fetchData];
}

export default useAsync;