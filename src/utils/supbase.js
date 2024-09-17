import {createClient} from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supbaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log(supabaseUrl)

const supabase = createClient(supabaseUrl,supbaseKey);


export const registerUser = async ({email,password}) =>{
    try {

        let {data, error} = await supabase.auth.signUp({email,password})
        
        if(error){
            throw error
        }

        return data;
        
  
    } catch (error) {

        console.error("Error Happend While SignUp At Supabase: ", error)
        throw error;
        
    }
}

export const logIn = async ({email,password}) =>{
    try {
        let {data, error} = await supabase.auth.signInWithPassword({email,password})
        if(error){
            throw error;
        }
        return data
    } catch (error) {
        console.error("Error happend while login @supabase: ", error)
        throw error;
    }
}


export const logOut = async () => {
    try {
       let { error } = await supabase.auth.signOut()

       if (error){
        throw error
       }
 
    } catch (error) {

        console.error("Error while logOut :", error)
        throw error
        
    }
}

export const isUserLoggedIn =  async () =>{
    try {
       
        const { data: { user } } = await supabase.auth.getUser()

        return user !== null;

        
    } catch (error) {
        console.error("Error Happened while checking user logged in status: ", error)
        throw error
    }
}

export const getCurrentUser = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      console.error("Error getting current user:", error.message);
      throw error;
    }
  };
