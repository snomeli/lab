let inptAddImg = document.querySelector('#add_post_img');
let labelAddImg = document.querySelector('#label_add_post_img');
let fileSize = document.querySelector('#file_size');
let fileName = document.querySelector('.form_label-button-text');
let progressBar = document.querySelector('#progressBar');

let xhr = new XMLHttpRequest();


inptAddImg.addEventListener('change', () => {

    let svg = document.querySelector('#svgInternalID');
    let preview = document.querySelector('#img_add_file');
    let file = document.querySelector('#add_post_img').files[0];
    let reader = new FileReader();

    progressBar.setAttribute('max', file.size);

    xhr.open('POST', 'https://isidea.ru/rgups_file.php', true);

    xhr.upload.onprogress = e => {
        progressBar.value = e.loaded;
    }

    xhr.upload.onload = () => {

        reader.onload = () => {
            preview.src = reader.result;
            preview.classList.remove('hide');
        }

        if (file) {

            reader.readAsDataURL(file);

            fileSize.textContent = formatBytes(file.size);
            fileName.textContent = file.name;

            fileName.classList.add('color_green');
            fileSize.classList.add('color_green');
            labelAddImg.classList.add('border_green');

            svg.setAttribute('fill', '#005F17');

        } else {

            preview.src = "";
            preview.classList.remove('hide');

            fileName.classList.remove('color_green');
            fileSize.classList.remove('color_green');
            labelAddImg.classList.remove('border_green');

            svg.setAttribute('fill', '#624C90');

            fileSize.textContent = '';
            fileName.textContent = 'Прикрепить файд изображения';

        }

    }

    xhr.send(file);

});

const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes'

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
};