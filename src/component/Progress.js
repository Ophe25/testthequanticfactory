import { Backdrop, CircularProgress } from "@mui/material";

function Progress(props) {

    return (
        <Backdrop
            className='progress'
            open
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Progress;