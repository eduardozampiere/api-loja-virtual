import api from '../api/api';

export async function isAuth(){
    // localStorage.setItem('@token', '123');
    if(localStorage.getItem('@token')){
        const config = {
            headers: {
                auth: localStorage.getItem('@token')
            }
        }
        try{
            await api.post('/auth', {}, config);
            return true;
        }catch(err){
            return false;
        }
    }
    else{
        return false;
    }
} 
