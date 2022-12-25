let authors = [

];

const CreateOptions = () => {
    let select = document.querySelector('#selectAuthors');

    authors.forEach(author => {
        let opt = document.createElement('option');
        opt.value = author.login;
        opt.innerHTML = author.name;
        select.appendChild(opt);
    });
};

CreateOptions();