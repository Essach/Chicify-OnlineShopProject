import './Faq.scss';

import faq from '../../icons/FAQ.svg';
import Question from './subcomponents/Question/Question';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';

const Faq = () => {
    
    const { languageMode } = useContext(StoreContext);

    const [questionItems, setQuestionsItems] = useState([]);

    useEffect(() => {
        const questions = [
        {
            title: "How can I place an order?",
            content: "You can place an order by browsing our products, adding items to your cart, and then proceeding to the checkout page to complete your purchase."
        },
        {
            title: "What payment methods do you accept?",
            content: "We accept various payment methods, including credit cards, PayPal, and more. You can find the full list of accepted payment options during the checkout process."
        },
        {
            title: "What is your return policy?",
            content: "Our return policy allows you to return items within 30 days of purchase. Please review our detailed return policy for specific conditions and instructions."
        },
        {
            title: "How can I track my order?",
            content: "Once your order is shipped, you will receive a tracking number via email. You can use this tracking number to monitor the status of your delivery."
        },
        {
            title: "Do you offer international shipping?",
            content: "Yes, we offer international shipping to many countries. During checkout, you can select your country to see if we deliver to your location and view the shipping options."
        },
        {
            title: "What is the estimated delivery time?",
            content: "Delivery times vary depending on your location and the shipping method you choose. You can find estimated delivery times in the checkout process before finalizing your order."
        },
        {
            title: "How can I contact customer support?",
            content: "You can reach our customer support team by emailing chicify.support@gmail.com. We aim to respond to inquiries within 24 hours."
        },
        {
            title: "What should I do if I receive a damaged item?",
            content: "If you receive a damaged item, please contact our customer support immediately with a description and photos of the damage. We will assist you in resolving the issue."
        },
        ]
        const questionsPl = [
        {
            title: "Jak mogę złożyć zamówienie?",
            content: "Możesz złożyć zamówienie, przeglądając nasze produkty, dodając przedmioty do koszyka, a następnie przechodząc do strony płatności, aby sfinalizować zakup."
        },
        {
            title: "Jakie metody płatności akceptujecie?",
            content: "Akceptujemy różne metody płatności, w tym karty kredytowe, PayPal i więcej. Pełną listę akceptowanych opcji płatności znajdziesz podczas procesu płatności."
        },
        {
            title: "Jaka jest Wasza polityka zwrotów?",
            content: "Nasza polityka zwrotów pozwala na zwrot przedmiotów w ciągu 30 dni od zakupu. Zapoznaj się z naszą szczegółową polityką zwrotów, aby dowiedzieć się o konkretnych warunkach i instrukcjach."
        },
        {
            title: "Jak mogę śledzić moje zamówienie?",
            content: "Po wysłaniu zamówienia otrzymasz numer śledzenia drogą mailową. Możesz użyć tego numeru śledzenia, aby monitorować status dostawy."
        },
        {
            title: "Czy oferujecie dostawę międzynarodową?",
            content: "Tak, oferujemy dostawę międzynarodową do wielu krajów. Podczas składania zamówienia możesz wybrać swój kraj, aby sprawdzić, czy dostarczamy do Twojej lokalizacji, i zobaczyć opcje dostawy."
        },
        {
            title: "Jaki jest szacowany czas dostawy?",
            content: "Czasy dostawy różnią się w zależności od Twojej lokalizacji i wybranej metody dostawy. Szacunkowe czasy dostawy znajdziesz w procesie płatności przed sfinalizowaniem zamówienia."
        },
        {
            title: "Jak mogę skontaktować się z obsługą klienta?",
            content: "Możesz skontaktować się z naszym zespołem obsługi klienta, wysyłając e-mail na adres chicify.support@gmail.com. Staramy się odpowiadać na zapytania w ciągu 24 godzin."
        },
        {
            title: "Co powinienem zrobić, jeśli otrzymam uszkodzony przedmiot?",
            content: "Jeśli otrzymasz uszkodzony przedmiot, skontaktuj się natychmiast z naszym działem obsługi klienta, podając opis i zdjęcia uszkodzenia. Pomożemy Ci rozwiązać ten problem."
        },
        ];
        
        if (languageMode === 'en') setQuestionsItems(questions.map((question, index) => <Question key={index} title={question.title} content={question.content} />)); 
        else setQuestionsItems(questionsPl.map((question, index) => <Question key={index} title={question.title} content={question.content} />))
    },[languageMode])

    return (
        <faq-page>
            <faq-title>
                <img src={faq} alt='faq icon' />
                <p>FAQ</p>
            </faq-title>
            <faq-questions>
                <inner-box>
                    {questionItems}
                </inner-box>
            </faq-questions>
        </faq-page>
    );
}

export default Faq;