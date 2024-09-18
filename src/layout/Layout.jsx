import { Link, Outlet } from 'react-router-dom';
import { X, MenuIcon, PlaneIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useState, useEffect,} from 'react';

import { isUserLoggedIn, logOut } from '@/utils/supbase';
import supabase from '@/utils/supbase';

function Layout() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false)
  const openMenu = () => {
    setOpen((prev) => !prev);
  };

  const closeOnScroll = () => {
    if (open) {
      setOpen(false);
    }
  };

  const closeOnResize = () => {
    if (window.innerWidth >= 768 && open) {
      setOpen(false);
    }
  };


  useEffect(()=>{
    const checkUserStatus = async () =>{
      const login = await isUserLoggedIn()
      console.log("user logged in : ", login)
      setIsLogin(login)
    }

    checkUserStatus();


    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsLogin(true);  // User is logged in
      } else {
        setIsLogin(false); // User is logged out
      }
    });
    
    return () =>{
      authListener?.subscription.unsubscribe()
    }


  },[])



  const handleLogout = async () =>{
    await logOut()
    console.log("user log out: ")
    setIsLogin(false)
    
  }


  useEffect(() => {
    window.addEventListener('scroll', closeOnScroll);
    window.addEventListener('resize', closeOnResize);

    return () => {
      window.removeEventListener('scroll', closeOnScroll);
      window.removeEventListener('resize', closeOnResize);
    };
  }, [open]);

  return (
    <div className="w-full h-screen">
      <nav className="w-full h-16 flex justify-between items-center px-4 bg-gray-100 border-b-2">
        <Link>
          <span className="text-zinc-700 font-semibold text-xl flex gap-2 items-center">
            <PlaneIcon />
            Travel Ai Agent
          </span>
        </Link>

        <ul className="hidden md:flex items-center justify-around w-[60%] text-xl text-gray-700">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          {isLogin && ( <li>
            <Link to="/premium-search">Premium Search</Link>
          </li>)}
        </ul>

        {/* Div to handle login and menu button */}
        <div className="flex w-[20%] h-full justify-around items-center md:justify-center">
          {/* Login button centered on larger screens */}
          {isLogin ?(<Button onClick={handleLogout} className="justify-self-center  hidden md:block">
            Logout
          </Button>) : (<Button className="justify-self-center  hidden md:block">
            <Link to='/login'> Login </Link>
          </Button>)}

          {/* Menu Button with equal space on smaller screens */}
          <Button
            onClick={openMenu}
            size="sm"
            className="block justify-self-center  md:hidden"
          >
            {open ? <X /> : <MenuIcon />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="w-full top-16 bg-white shadow-lg">
          <ul className="w-full flex flex-col items-center text-gray-700">
            <li className="w-full">
              <Link
                to="/"
                className="block py-3 text-center w-full hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/search"
                className="block py-3 text-center w-full hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                Search
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/About"
                className="block py-3 text-center w-full hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                About
              </Link>
            </li>
            {isLogin && (  <li className="w-full">
              <Link
                to="/premium-search"
                className="block py-3 text-center w-full hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              >
                Premium Search
              </Link>
            </li>)}
            <li className="flex justify-center items-center w-full py-3">
               {isLogin ? (<Button className="w-full mx-6" onClick={handleLogout} > Logout  </Button> ):(<Button className="w-full mx-6" > <Link to='/login'>Login</Link>   </Button> )}
            </li>
          </ul>
        </div>
      )}

      <main className="w-full min-h-screen">
        <Outlet />
      </main>

      <footer className="bg-gray-800 py-10 w-full">
        <h1 className="text-center text-white text-2xl ">
          Made with ❤️ Prashant Swaroop
        </h1>
      </footer>
    </div>
  );
}

export default Layout;
