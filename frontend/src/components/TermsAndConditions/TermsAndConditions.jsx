import './TermsAndConditions.scss';

import goBack from '../../icons/goBackT&C.svg';
import { useNavigate } from 'react-router';

const TermsAndConditions = () => {
    const navigate = useNavigate();

    const handleOnClickGoBack = () => navigate(-1);

    return (
        <terms-and-conditions>
            <go-back-btn>
                <img src={goBack} alt='go back' onClick={handleOnClickGoBack}/>
            </go-back-btn>
            <text-content>
                <text-title>
                    <p className='big'>Terms & Conditions</p>
                    <p className='small'>Chicify.co</p>
                </text-title>
                <text-content-content>
                    Lorem ipsum dolor sit amet. Aut fugiat quaerat est omnis amet non alias dolores et nihil dolore in consectetur ducimus ut beatae internos quo minima architecto. In laborum eius 33 internos fugiat qui quod debitis ut eaque nihil et repellat similique eos velit reprehenderit.
                    Quo tempore ipsa ut ducimus nulla sit ratione suscipit est dolores consequatur quo illo laboriosam ut accusantium temporibus quo sunt tempora. Est magni unde ut voluptatibus quam aut modi rerum. Qui deserunt quod ex odit odit in doloremque vitae ex sapiente debitis?
                    Vel autem aliquam ut illo dolorem et error voluptatem id illum rerum sed laboriosam quaerat. Ut laudantium suscipit sit cumque galisum non ipsum voluptatem nam dolor maxime et iusto nulla vel accusamus ipsa? Ea omnis delectus non mollitia quidem cum dolores atque ut necessitatibus nihil aut officia vitae rem voluptas suscipit ut dignissimos quia.
                    Lorem ipsum dolor sit amet. Ea perferendis unde ea culpa galisum quo possimus maxime qui necessitatibus temporibus. Eum voluptatem error qui maiores consectetur qui accusamus voluptatem non quis ducimus.
                    Sit dolorem reprehenderit aut ipsa voluptatum ex voluptas necessitatibus nam ratione magni. Aut minus rerum et fugiat earum qui aspernatur illo et similique ipsum.
                    Ut omnis iusto 33 saepe cumque non eligendi saepe? Est veritatis velit cum quas voluptatem sed voluptas omnis sit reiciendis inventore a amet nobis. Aut vero maxime qui impedit deserunt a dolorum dolor aut unde necessitatibus ut cumque mollitia aut perspiciatis quae. Et earum ipsum ab dolor distinctio At praesentium molestiae sed velit perspiciatis At unde officiis.
                </text-content-content>
            </text-content>
        </terms-and-conditions>
    );
}

export default TermsAndConditions;