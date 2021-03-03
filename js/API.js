const LINK = {
    cards: 'https://ajax.test-danit.com/api/v2/cards',
    login: 'https://ajax.test-danit.com/api/v2/cards/login',
};

const headersTemplate = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
        ? `Bearer ${localStorage.getItem('token')}`
        : undefined,
};

const auth = (user) => {
    return fetch(LINK.login, {
        method: 'POST',
        headers: headersTemplate,
        body: JSON.stringify(user)
    })
};

const getCards = () => {
    return fetch(LINK.cards, {
        headers: headersTemplate
    }).then(r => r.json());
};

const addCard = (cardObj) => {
    return fetch(LINK.cards, {
        method: "POST",
        body: JSON.stringify(cardObj),
        headers: headersTemplate
    });
};

const changeCard = (cardId, method, body = undefined) => {
    return fetch((`https://ajax.test-danit.com/api/v2/cards/${cardId}`), {
        method: method,
        headers: headersTemplate,
        body: body,
    });
}

export default {
    auth,
    getCards,
    addCard,
    changeCard,
    headersTemplate
}