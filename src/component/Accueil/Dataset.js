
function Dataset(image, nom) {

    return (
        <div>
            <img src={image} height={300} />
            <div><p>{nom}</p></div>

        </div>
    );
}

export default Dataset;
