function Header(props) {

    return (
        <div className="header">
            <p
                className="retour"
                style={{

                }}
                onClick={props.navigation}
            >Retour</p>
            <div className="image">
                <img
                    src={props.url}
                    height={160}
                />
            </div>
            <div className="texte">
                <h1>{props.nom}</h1>
                <p>{props.nbResults + ' ' + props.nom.toLowerCase() + ' trouvées'}</p>
            </div>
        </div>
    );
}

export default Header;