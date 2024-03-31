import Appbar from "./Appbar"
import { Audio } from 'react-loader-spinner'

const Skeleton = () => {
    return (
        <>
            <Appbar />
            <Audio
                height="80"
                width="80"
                color="black"
                ariaLabel="loading"
                wrapperStyle={{ height: "90vh", margin: "auto", display: " flex", justifyContent: "center", alignItems: "center" }}
                wrapperClass=""
            />
        </>
    )
}

export default Skeleton
