import { useEffect,useState } from "react"
import { isUserLoggedIn } from "@/utils/supbase";
import { useNavigate } from "react-router-dom";


function SavedTrip() {

  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate()

  const checkingAuthentication = async () =>{
    try {

      const login = await isUserLoggedIn()

      console.log("checking login at search page.",login)

      if (login == false){
        navigate("/login")
      }
      else{
        setCheckingAuth(false)
      }
      
    }
    catch(error){
      console.error("Error while checking logged in user at searchPage: ", error)
      throw error;
    }

  }

  useEffect(()=>{
    checkingAuthentication();
  },[])


  return <div>SavedTrip</div>;
}

export default SavedTrip;
