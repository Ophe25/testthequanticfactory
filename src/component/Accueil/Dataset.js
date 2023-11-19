import './Accueil.css'

function Dataset(props) {

    return (
        <div
            key={props.i}
            className='dataset'
            style={{
                backgroundImage: "url(" + props.image + ")",
            }}
            onClick={props.navigation}
        >
            <div>
                <p>
                    {props.nom}
                </p>
            </div>

        </div>
    );
}

export default Dataset;
