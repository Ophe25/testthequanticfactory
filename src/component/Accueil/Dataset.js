var type = [
    {
        image: require('../../assets/image/Fontaines.png'),
        nom: 'Fontaines',
        // navigation: <Fontaines />,
    },
    {
        image: require('../../assets/image/Activites.png'),
        nom: 'Équipements et activités',
        navigation: 'fdsfv',
    },
    {
        image: require('../../assets/image/Espaces.png'),
        nom: 'Espaces verts',
        navigation: '',
    }
]

function Dataset() {

    return (
        <div
            // key={i}
            style={{
                backgroundImage: "url(" + type.image + ")",
                backgroundRepeat: ' no-repeat',
                backgroundPosition: 'center',
                flex: 1,
                height: '80vh',

            }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: 'fit-content', padding: 5, borderRadius: 20 }}>
                <p onClick={{}}>{type.nom}</p>
            </div>

        </div>
    );
}

export default Dataset;
