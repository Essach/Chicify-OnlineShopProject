import './StartSelling.scss';

import close from '../../icons/closeMintyBlue.svg';

import { useContext, useState } from 'react';

import { useNavigate } from 'react-router';
import request from '../../helpers/request';
import { StoreContext } from '../../store/StoreProvider';

import { updateUser } from '../../helpers/localStorage';

const StartSelling = () => {
    const navigate = useNavigate();

    const { user, setUser, languageMode } = useContext(StoreContext);

    const countryList = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        `United Kingdom of Great Britain and Northern Ireland (the)`,
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands"
    ];
    const countryOptions = countryList.map(country => <option key={country} value={country}>{country}</option>)

    const [isFormValidated, setIsFormValidated] = useState(true)
    const [validationMessage, setValidationMessage] = useState('')

    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [postal, setPostal] = useState('')
    const [accountNumber, setAccountNumber] = useState('')

    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeCountry = (e) => setCountry(e.target.value);
    const handleChangeCity = (e) => setCity(e.target.value);
    const handleChangeStreet = (e) => setStreet(e.target.value);
    const handleChangePostal = (e) => setPostal(e.target.value);
    const handleChangeAccountNumber = (e) => {
        if (/^[0-9]*$/.test(e.target.value) || e.target.value.at(-1) === undefined) {
            setAccountNumber(e.target.value);
        }
    }

    const handleClose = () => {
        navigate(-1)
    }

    const checkValidation = () => {
        let isValid = true;
        if (name === '' || country === '' || city === '' || street === '' || accountNumber === '') {
            setIsFormValidated(false);
            if (languageMode === 'en') setValidationMessage('*Please insert correct data');
            else setValidationMessage('*Proszę wprowadzić prawidłowe dane');
            isValid = false;
            return isValid;
        }

        setIsFormValidated(true);
        setValidationMessage('');
        return isValid;
    }

    const handleStartSelling = async () => {
        const isValid = checkValidation();

        if (isValid) {
            const { data, status } = await request.patch(`/users/seller`,
                { id: user.id, name: name, country: country, city: city, street: street, postal: postal, accountNumber: accountNumber });

            if (status === 200) {
                updateUser(data.user);
                setUser(data.user);
                setName('')
                setCountry('')
                setCity('')
                setStreet('')
                setPostal('')
                setAccountNumber('')
                navigate('/')
            } else if (status === 405) {
                setIsFormValidated(false);
                if (languageMode === 'en') setValidationMessage("You're already signed up for the seller program");
                else setValidationMessage("Jesteś już zarejestrowany w programie dla sprzedawców");
            } else {
                console.log(data, status)
                setIsFormValidated(false);
                if (languageMode === 'en') setValidationMessage('*Internal server error');
                else setValidationMessage('*Wewnętrzny błąd serwera');
                throw new Error(data.message)
            }
        }
    }

    return (
        <start-selling-page>
            <title-and-close>
                <p>{languageMode === 'en' ? 'Start selling' : 'Zacznij sprzedawać'}</p>
                <img src={close} alt='close form' onClick={handleClose}/>
            </title-and-close>
            <start-selling-form>
                <form-section>
                    <p>{languageMode === 'en' ? `Your company's name:` : 'Nazwa twojej firmy'}</p>
                    <input-container>
                        <input
                            type="text"
                            placeholder={languageMode === 'en' ? "Company's name" : 'Nazwa firmy'}
                            value={name}
                            onChange={handleChangeName}
                        />
                    </input-container>
                </form-section>
                <form-section>
                    <p>{languageMode === 'en' ? `Company's address:` : 'Adres firmy'}</p>
                    <input-container-center>
                        <select defaultValue={country} name='country' onChange={handleChangeCountry}>
                            <option value=''>{languageMode === 'en' ? 'Please select a country' : 'Prosze wybierz kraj'}</option>
                            {countryOptions}
                        </select>
                        <input
                            type="text"
                            placeholder={languageMode === 'en' ? 'City' : 'Miasto'}
                            value={city}
                            onChange={handleChangeCity}
                        />
                        <input
                            type="text"
                            placeholder={languageMode === 'en' ? 'Street' : 'Ulica'}
                            value={street}
                            onChange={handleChangeStreet}
                        />
                        <input
                            type="text"
                            placeholder={languageMode === 'en' ? 'Postal code' : 'Kod pocztowy'}
                            value={postal}
                            onChange={handleChangePostal}
                            maxLength={10}
                        />
                    </input-container-center>
                </form-section>
                <form-section>
                    <p>{languageMode === 'en' ? 'Account number:' : 'Numer rachunku konta'}</p>
                    <input-container>
                        <input
                            type="text"
                            placeholder={languageMode === 'en' ? 'Account number' : 'Numer rachunku konta'}
                            value={accountNumber}
                            onChange={handleChangeAccountNumber}
                            maxLength={30}
                        />
                    </input-container>
                </form-section>
            </start-selling-form>
            <validation-message>{isFormValidated ? null : <p>{validationMessage}</p>}</validation-message>
            <start-selling-button onClick={handleStartSelling}><p>{languageMode === 'en' ? 'Sign ip for seller program' : 'Zapisz się do programu dla sprzedawców'}</p></start-selling-button>
        </start-selling-page>
    );
}

export default StartSelling;