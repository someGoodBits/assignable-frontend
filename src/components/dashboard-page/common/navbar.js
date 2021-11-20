import {ReactComponent as Logo} from "../../../assets/images/logo.svg" ;

const Navbar = ({navbarHeight}) => {
    return ( 
        <nav className="navbar shadow-sm bg-100" style={{height:navbarHeight}}>
            <div className="container">
                <div className="navbar-brand d-flex align-items-center">
                    <Logo width="42" height="42" />
                    <span className="ms-2 text-900 fs-4" style={{fontWeight:900,lineHeight:0.8}}>assignable</span>
                </div>
            </div>
        </nav> 
    );
}
 
export default Navbar;