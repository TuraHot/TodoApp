import { Button } from "react-bootstrap";

const AppFooter = () => {
    return ( 
        <div className="text-center my-1">
            <h3>
                <span className="badge bg-primary">SPU</span>
                -
                <span className="badge bg-info">SIT</span>
                -
                <span className="badge bg-dark">CSI</span>
            </h3>
            <div className="d-flex justify-content-center gap-2">
                <a href="https://www.facebook.com/spu.informatics"><Button variant="primary"><i className="bi bi-facebook"></i></Button></a>
                <a href="https://www.spu.ac.th/"><Button variant="warning"><i className="bi bi-browser-chrome"></i></Button></a>
                <a href="https://www.instagram.com/sripatum_spu/"><Button variant="danger"><i className="bi bi-instagram"></i></Button></a>
            </div>
        </div>
     );
}
 
export default AppFooter;