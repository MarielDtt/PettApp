import { Link, useLocation } from "react-router-dom";
function Logo() {
    const location = useLocation();
  
    return (
            location.pathname === "/" || location.pathname === "/registro" ? (
            <>
            <Link to= "/">
                <img src="/Logo_Final.png" alt="Logo App" />
            </Link>
            </>
            ):
            (
                <>
                <Link to= "/turnos">
                    <img src="/Logo_Final.png" alt="Logo App" />
                      
                </Link> 
                </>
            )      
    )
  }
  
  export default Logo;