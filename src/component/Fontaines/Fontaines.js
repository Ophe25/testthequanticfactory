import { useEffect, useState } from 'react';
import api from '../../API/api';
import { Table } from 'react-bootstrap';
import { Backdrop, CircularProgress, Pagination } from '@mui/material';
import Header from '../Header';
import '../Component.css'
import Progress from '../Progress';


function Fontaines({ navigation }) {

    const [currentFiltres, setCurrentFiltres] = useState([]);
    const [filtres, setFiltres] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [fontaines, setFontaines] = useState([]);
    const [page, setPage] = useState(1);


    useEffect(() => {
        api.getFontainesExport().then((fontaines) => {

            var filtreCommune = []
            fontaines.forEach(fontaine => {
                if (filtreCommune.indexOf(fontaine.commune) === -1 && fontaine.dispo === 'OUI') {
                    filtreCommune.push(fontaine.commune)
                }
            });
            setFiltres(filtreCommune)
            setCurrentFiltres([])
            setIsMounted(true)
        })
    }, []);

    useEffect(() => {
        api.getFontaines(currentFiltres).then((fontaines) => {

            setFontaines(fontaines);
        })
    }, [currentFiltres]);

    function _filtreFontaine(name, value) {

        const index = currentFiltres.findIndex((filtre) => filtre.value === value && filtre.name === name)

        var filtreCpy = [...currentFiltres]

        if (currentFiltres.findIndex((filtre) => filtre.name === 'offset') !== -1) {
            filtreCpy.splice(index, 1)
            filtreCpy.push({ name, value })
        } else {
            if (index !== -1) {
                filtreCpy.splice(index, 1)
            } else {
                filtreCpy.push({ name, value })
            }
        }
        setCurrentFiltres(filtreCpy)

    }

    function _changePage(event, value) {
        setPage(value)
        var idFirstRow = (value - 1) * 10
        _filtreFontaine('offset', idFirstRow)
    }




    return (

        <div>
            {isMounted ?
                <div>
                    <Header nom='Fontaines à boire' nbResults={fontaines.total_count} url={require('../../assets/image/Fontaines.JPG')} navigation={() => navigation.goBack()} />

                    <div className='body'>
                        <div className='filtres'>
                            <h3>Filtres</h3>
                            <h4>Commune :</h4>
                            {filtres.map((filtre, id) =>
                                <p
                                    key={id}
                                    style={{
                                        color: (currentFiltres.findIndex((filtre) => filtre.value == 'commune:"' + filtre + '"')) === -1 ? 'white' : '#5f259f',
                                    }}
                                    onClick={() => {
                                        _filtreFontaine('refine', 'commune:"' + filtre + '"')
                                    }}>{filtre.toLowerCase()}</p>)}
                        </div>
                        <div className='tableau-datasets'>
                            <Table>
                                <thead>
                                    <tr className='table-header' >
                                        <th style={{ borderTopLeftRadius: 20 }}>Adresse</th>
                                        <th style={{ borderTopRightRadius: 20 }}>Commune</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fontaines?.results?.map((fontaine, i) =>
                                        <tr style={{
                                            backgroundColor: i % 2 ? 'rgba(95, 37, 159, 0.35)' : 'rgba(95, 37, 159, 0.15)',
                                        }}>
                                            <td>{((fontaine.no_voirie_pair === null ? fontaine.no_voirie_impair : fontaine.no_voirie_pair) || (fontaine.no_voirie_pair === null && fontaine.no_voirie_impair === null ? '' : <></>)) + ' ' + fontaine.voie.toLowerCase()}</td>
                                            <td>{fontaine.commune.toLowerCase()}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            <div className='pagination'>
                                <Pagination
                                    count={Math.ceil(fontaines.total_count / fontaines.results.length)}
                                    shape="rounded"
                                    onChange={_changePage}
                                    page={page}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Progress />
            }
        </div>
    );
}

export default Fontaines;
