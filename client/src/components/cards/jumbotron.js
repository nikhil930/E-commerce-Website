export default function Jumbotron (props) {
    return <div className="container-fluid bg-primary">
        <div className="row">
            <div className = "col text-center p-4 bg-light" >
                <h1>{props.title}</h1>
                <p className="lead">{props.subTitle}</p>
            </div>
        </div>
    </div>  
};


