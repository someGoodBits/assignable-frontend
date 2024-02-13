import {ReactComponent as Logo} from "../../assets/images/logo-white.svg" ;

const Header = ({height}) => {
    return (
        <div className="d-flex align-items-center justify-content-center justify-content-md-start" style={{height:height}}>
            <Logo width="42" height="42" />
            <span className="ms-2 text-white fs-4" style={{fontWeight:900,lineHeight:0.8}}>Assignable</span>
        </div>
    );
};

export default Header;
