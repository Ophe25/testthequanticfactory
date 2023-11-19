import './Accueil.css'
import Dataset from './Dataset';

function Accueil({ navigation }) {

    var type = [
        {
            image: require('../../assets/image/Fontaines.png'),
            nom: 'Fontaines',
            navigation: 'Fontaines',
        },
        {
            image: require('../../assets/image/Activites.png'),
            nom: 'Équipements et activités',
            navigation: 'Activites',
        },
        {
            image: require('../../assets/image/Espaces.png'),
            nom: 'Espaces verts',
            navigation: 'EspacesVerts',
        }
    ]

    return (
        <div>
            <h1 className='titre'>
                Que recherchez-vous ?
            </h1>
            <div className='datasets'>
                {type.map(function (dataset, i) {
                    return (
                        <Dataset navigation={() => navigation.navigate(dataset.navigation)} nom={dataset.nom} image={dataset.image} i={i} />
                    )
                }
                )}
            </div>
        </div >
    );
}

export default Accueil;
