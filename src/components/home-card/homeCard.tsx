import "./homeCard.css"

export function Card(props:
    {
        logo: string;
        title: string;
        subTitle: string;
        courses: string;

    }) {

    return (
        <div className="card container-fluid m-2 w-25 border border-2 p-4 rounded rounded-2 shadow shadow-lg">
            <div className="card-header">
                <span className="fs-1 fw-bold text-primary" > <span className={props.logo}></span> </span>
            </div>
            <div className="card-body">
                <p className="fs-2 fw-bold">{props.title}</p>
                <p className="fs-6 fst-italic fw-bold">{props.subTitle}</p>
            </div>
            <div className="card-footer bg-primary text-white rounded rounded-2 " role="button" >
                {props.courses}
            </div>
        </div >
    )
}