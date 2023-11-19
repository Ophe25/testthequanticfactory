import { useEffect, useState } from 'react';
import api from '../../API/api';
import { Table } from 'react-bootstrap';
import { Backdrop, CircularProgress, Pagination } from '@mui/material';
import Header from '../Header';
import Progress from '../Progress';

function Activites({ navigation }) {

    const [currentFiltres, setCurrentFiltres] = useState([]);
    const [filtresArrondissement, setFiltresArrondissement] = useState([]);
    const [filtresType, setFiltresType] = useState([]);
    const [filtresPayant, setFiltresPayant] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [activites, setActivites] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        api.getActivitesExport().then((activites) => {

            var filtreArrondissement = []
            var filtreType = []
            var filtrePayant = []
            activites.forEach(activite => {
                if (filtreArrondissement.indexOf(activite.arrondissement) === -1) {
                    filtreArrondissement.push(activite.arrondissement)
                }
                if (filtreType.indexOf(activite.type) === -1) {
                    filtreType.push(activite.type)
                }
                if (filtrePayant.indexOf(activite.payant) === -1) {
                    filtrePayant.push(activite.payant)
                }
            });

            setFiltresArrondissement(filtreArrondissement)
            setFiltresType(filtreType)
            setFiltresPayant(filtrePayant)
            setCurrentFiltres([])
            setIsMounted(true)
        })
    }, []);

    useEffect(() => {
        api.getActivites(currentFiltres).then((activites) => {
            setActivites(activites);
        })
    }, [currentFiltres]);

    function _filtreActivites(name, value) {

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
        _filtreActivites('offset', idFirstRow)
    }

    return (
        <div>
            {isMounted ?
                <div>
                    <Header nom='Équipements et activités' nbResults={activites.total_count} url={require('../../assets/image/Piscine.jpg')} navigation={() => navigation.goBack()} />

                    <div className='body'>
                        <div className='filtres'>
                            <h3>Filtres</h3>
                            <div>
                                <h4>Type :</h4>
                                {filtresType.map((filtreType, id) =>
                                    <p
                                        key={id}
                                        onClick={() => {
                                            _filtreActivites('refine', 'type:"' + filtreType + '"')
                                        }}>{filtreType}</p>)}
                            </div>
                            <div>
                                <p style={{ color: 'white', fontFamily: 'nexaHeavy' }}>Arrondissements</p>
                                {filtresArrondissement.map((filtreArrondissement, id) =>
                                    <p
                                        key={id}
                                        onClick={() => {
                                            _filtreActivites('refine', 'arrondissement:"' + filtreArrondissement + '"')
                                        }}>{filtreArrondissement}</p>)}
                            </div>
                            <div>
                                <p style={{ color: 'white', fontFamily: 'nexaHeavy' }}>Payant</p>
                                {filtresPayant.map((filtrePayant, id) =>
                                    <p
                                        key={id}
                                        onClick={() => {
                                            _filtreActivites('refine', 'arrondissement:"' + filtrePayant + '"')
                                        }}>{filtrePayant}</p>)}
                            </div>
                        </div>
                        <div className='tableau-datasets'>
                            <Table>
                                <thead>
                                    <tr className='table-header'>
                                        <th style={{ borderTopLeftRadius: 20 }}>Nom</th>
                                        <th >Type</th>
                                        <th >Adresse</th>
                                        <th >Arrondissement</th>
                                        <th style={{ borderTopRightRadius: 20 }}>Payant</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activites?.results?.map((activite, i) =>
                                        <tr
                                            id={i}
                                            style={{
                                                backgroundColor: i % 2 ? 'rgba(95, 37, 159, 0.35)' : 'rgba(95, 37, 159, 0.15)',

                                            }}>
                                            <td style={{ borderBottomLeftRadius: i + 1 === activites.results.length ? 20 : 0 }}>{activite.nom.toLowerCase()}</td>
                                            <td>{activite.type}</td>
                                            <td>{activite.adresse?.toLowerCase()}</td>
                                            <td >{activite.arrondissement}</td>
                                            <td style={{ borderBottomRightRadius: i + 1 === activites.results.length ? 20 : 0 }}>{activite.payant}</td>

                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            <div className='pagination'>
                                <Pagination
                                    count={Math.ceil(activites.total_count / activites.results.length)}
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

export default Activites;

