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

  export const fetchSavedTrip = async () =>{

  try {
    
    const { data: user, error: authError } = await supabase.auth.getUser();

    if (authError){
      throw new Error("Authentication Error: ", authError.message)
    }

    if(!user){
      throw new Error("User Is Not Authenticated");
    }

    let {data: travelPlans, error} = await supabase.from("Travel Plan").select("id, trip_name, trip_data").eq('user_id',user.user.id)

    if (error){
      throw new Error("Error while fetching saved trip data: ", error.message)
    
    }
    console.log("data : ", travelPlans)

    return travelPlans;


    
  } catch (error) {

    console.error("error: ",error.message);
    
  }

  }

  export const deleteSavedTrip = async (tripId) => {
    try {
      // Get the currently logged-in user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
  
      // Check for authentication error
      if (authError) {
        throw new Error('Authentication Error: ' + authError.message);
      }
  
      // Ensure the user is authenticated
      if (!user) {
        throw new Error('User is not authenticated.');
      }
  
      // Perform delete operation where trip ID and user ID match
      const { data, error: deleteError } = await supabase
        .from('Travel Plan')
        .delete()
        .eq('id', tripId)        // Ensure it matches the provided trip ID
        .eq('user_id', user.id);  // Ensure it matches the logged-in user's ID
  
      // Check if the delete operation had an error
      if (deleteError) {
        throw new Error('Error deleting travel plan: ' + deleteError.message);
      }
  
      // If successful, return some success message or data
      return { success: true, message: 'Trip deleted successfully' };
  
    } catch (error) {
      // Handle and log errors
      console.error('Error in deleteSavedTrip:', error);
      return { success: false, error: error.message }; // Return error object with message
    }
  };
  
  export default supabase;