import './skeleton.scss';

const SkeletonLoad = () => {
    return (
        <>
            <p className="char__select">Collecting information</p>
            <div className="skeleton">
                <div className="pulse skeleton__header">
                    <div className="pulse skeleton__circle"></div>
                    <div className="pulse skeleton__mini"></div>
                </div>
                <div className="pulse skeleton__block"></div>
                <div className="pulse skeleton__block"></div>
                <div className="pulse skeleton__block"></div>
            </div>
        </>
    )
}

export default SkeletonLoad;