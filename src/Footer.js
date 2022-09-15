import ControlPanel from "./ControlPanel"
import CurrentlyPlaying from "./CurrentlyPlaying"
import TimeSlider from "./TimeSlider"
import VolumeSlider from "./VolumeSlider"

function Footer(){
    return (
        <footer className="dashed-border-blue">
            <CurrentlyPlaying />
            <div className="auto-rows dashed-border-green">
                <ControlPanel />
                <TimeSlider />
            </div>
            <VolumeSlider />
        </footer>
    )
}

export default Footer


