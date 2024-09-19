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

        if(user?.aud === "authenticated"){
            return true
        }
        else{
            return false
        }

        
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

  export const insertData = async (city, markdown_data) => {
    const { data: user, error: authError } = await supabase.auth.getUser();
    
    if (user) {
      const { data, error } = await supabase
        .from("Travel Plan")
        .insert({
          trip_name: city,
          trip_data: markdown_data,
          user_id: user.user.id
        })
        .select(); // Optional, if you want to return the inserted data
  
      if (error) {
        console.error("Error while adding data:", error);
      } else {
        console.log("Data inserted successfully:", data);
      }
  
    } else {
      console.log("User not authenticated or an authentication error occurred:", authError);
    }
  };
  
  export default supabase;