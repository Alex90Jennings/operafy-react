import InstallButton from "./InstallButton"
import LeftMenuNav from "./LeftMenuNav"
import ProfileButton from "./ProfileButton"
import Logo from "./Logo"
import Playlist from "./Playlist"

function LeftMenu(){
    return (
        <aside className="left-menu dashed-border-blue">
            <Logo />
            <LeftMenuNav />
            <Playlist />
            <InstallButton />
            <ProfileButton />
        </aside>
    )
}

export default LeftMenu


