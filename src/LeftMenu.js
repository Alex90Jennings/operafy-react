import InstallButton from "./InstallButton"
import LeftMenuNav from "./LeftMenuNav"
import ProfileButton from "./ProfileButton"
import Logo from "./Logo"
import Playlist from "./Playlist"
import { useState } from "react";

function LeftMenu(){
    const [playlistUL, ] = useState([
        {name: "gym opera", songs: []},
        {name: "Mozart Madness", songs: []},
        {name: "dubstep opera mashup", songs: []},
        {name: "road trip opera", songs: []},
        {name: "summer 2014 opera", songs: []},
        {name: "opera chilled", songs: []},
        {name: "underground", songs: []}
    ])

    return (
        <aside className="left-menu dashed-border-blue">
            <Logo />
            <LeftMenuNav />
            <Playlist playlistUL = {playlistUL}/>
            <InstallButton />
            <ProfileButton />
        </aside>
    )
}

export default LeftMenu


