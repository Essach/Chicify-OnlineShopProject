import './Footer.scss';

import emailIcon from '../../icons/email.svg';
import tiktokIcon from '../../icons/tiktok.svg';
import facebookIcon from '../../icons/facebook.svg';

const Footer = () => {
    return (
        <footer>
            <footer-container>
                <footer-info>
                    <li>
                        <img src={facebookIcon} alt='our facebook' />
                        <p>Chicify</p>
                    </li>
                    <li>
                        <img src={tiktokIcon} alt='our tiktok' />
                        <p>Chicify</p>
                    </li>
                    <li>
                        <img src={emailIcon} alt='our email' />
                        <p>chicify.support@gmail.com</p>
                    </li>
                </footer-info>
            </footer-container>
        </footer>
    );
}

export default Footer;