import {ReactComponent as Logo} from "../../../assets/images/logo.svg" ;

const Navbar = ({navbarHeight}) => {
    return ( 
        <nav className="navbar shadow" style={{height:navbarHeight}}>
            <div className="container">
                <div className="navbar-brand d-flex align-items-center">
                    <Logo width="42" height="42" />
                    <span className="ms-2" style={{fontSize:"24px",fontWeight:900,lineHeight:0.8}}>Assignable</span>
                </div>
            </div>
        </nav> 
    );
}
 
export default Navbar;