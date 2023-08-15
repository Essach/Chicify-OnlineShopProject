import './Home.scss';
import HomeContent from './subcomponents/HomeContent/HomeContent';
import Slider from './subcomponents/Slider/Slider';

const Home = () => {

    return (
        <home-container>
            <Slider />
            <HomeContent />
        </home-container>
    );
}

export default Home;