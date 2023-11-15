import api from '../../API/api';
import Fontaines from '../Fontaines/Fontaines';


function Accueil() {

    var type = [
        {
            image: require('../../assets/image/Fontaines.png'),
            nom: 'Fontaines',
            navigation: <Fontaines />,
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

    // api.getFontaines('refine=dispo:NON').then((json) => {
    //     console.log('test', json)
    // })

    return (
        <div>
            <h3>Que recherchez-vous ?</h3>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {type.map(function (dataset, i) {
                    return (
                        <div
                            key={i}
                            style={{
                                backgroundImage: "url(" + dataset.image + ")",
                                backgroundRepeat: ' no-repeat',
                                backgroundPosition: 'center',
                                flex: 1,
                                height: '80vh',

                            }}>
                            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', width: 'fit-content', padding: 5, borderRadius: 20 }}>
                                <p onClick={{}}>{dataset.nom}</p>
                            </div>

                        </div>
                    )
                }
                )}
            </div>
        </div >
    );
}

export default Accueil;
