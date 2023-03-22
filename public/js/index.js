const homeFunction = async () => {
    document.location.replace('/');
};

document.querySelector('#home').addEventListener('click', homeFunction);