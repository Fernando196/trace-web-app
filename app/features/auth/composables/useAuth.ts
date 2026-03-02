export const useAuth = () =>{
    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const handleLogin = async () =>{
        try{
            isLoading.value = true;
            
        }catch(err){
            error.value = 'Login failed. Please try again.';
        }finally{
            isLoading.value = false;
        }
    }


    return{
        email,
        password,
        isLoading,
        error,
        handleLogin
    }
}