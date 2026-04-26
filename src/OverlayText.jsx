export default function OverlayText() {
    return (
        <>
            <div className="ginger-text">
                <h1 className="title">
                    <span>Ginger</span>
                    <span>Bread</span>
                    <span>House</span>
                </h1>
                <p className="cozy-sentence">
                    Stay home, relax, and unwind. Enjoy the quiet of the day with a warm cup in hand.
                </p>
            </div>

            <div className="profile-container">
                <div className="profile">
                    <div className="name">Chimakes</div>
                    <div className="date">03/14/2026</div>
                </div>
                <div className="x-logo">
                    <a href="https://x.com/Chimakes3d">
                        <img src="/assets/x-logo.svg" alt="X logo" width="32" height="32"></img>
                    </a>
                </div>
                <div className="github-logo">
                    <a href="https://github.com/chimakes/gingerbread-house">
                        <img src="/assets/GitHub_Invertocat_White.svg" alt="github logo" width="32" height="32" />
                    </a>
                </div>
            </div>
        </>
    )
}