import api from '../../API/api';
// import Fontaines from '../Fontaines/Fontaines';
import Dataset from './Dataset';


function Accueil() {

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

    // api.getFontaines('refine=dispo:NON').then((json) => {
    //     console.log('test', json)
    // })

    return (
        <div>
            <h1 style={{ textAlign: 'center', color: '#5f259f', fontFamily: 'NexaHeavy' }}>Que recherchez-vous ?</h1>
            <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
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
                                alignSelf: 'center',
                                display: 'flex',
                                justifyContent: 'center',

                            }}>
                            <div
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    width: 'fit-content',
                                    padding: 20,
                                    borderRadius: 20,
                                    justifyContent: 'center',
                                    alignSelf: 'center'
                                }}>
                                <p style={{ margin: 0, fontFamily: 'NexaHeavy' }}>{dataset.nom}</p>
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
