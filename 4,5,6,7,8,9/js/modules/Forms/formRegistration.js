import OpenModalEnter from "../Modal/ModalEnter.js";

let inputPass = document.querySelector("#pass_registration");
let confirmationPass = document.querySelector("#pass_confirmation");

const AddClassesToImgAndTextFooterItem = (imgOn, imgOff, text, dopParam) => {
    if (dopParam === 'on') {
        imgOn.classList.remove('hide');
        text.classList.remove('color_red');
        imgOff.classList.add('hide');
    } else {
        imgOn.classList.add('hide');
        text.classList.add('color_red');
        imgOff.classList.remove('hide');
    }
};

let btnRegistration = document.querySelector('#btn_registration');

const ValueCheckBox = myCheckBox => {
    !myCheckBox.checked
        ? btnRegistration.disabled = true
        : btnRegistration.disabled = false;
};

const ChangeStateEquals = (block, typeDataAtt, dopParam) => {
    let parentDiv = block.parentNode;
    let footerItems = parentDiv.querySelectorAll(".item_footer[data-type]");

    footerItems.forEach(it => {
        let categoriesIt = it.dataset.type;

        let imgOn = it.querySelector('.img_on');
        let imgOff = it.querySelector('.img_off');
        let text = it.querySelector('.item_footer_text');

        if (categoriesIt === typeDataAtt) {
            block.classList.add('border_and_text_color_red');
            AddClassesToImgAndTextFooterItem(imgOn, imgOff, text);
        }

        if (categoriesIt === typeDataAtt && dopParam === 'Не равны') {
            block.classList.remove('border_and_text_color_red');
            AddClassesToImgAndTextFooterItem(imgOn, imgOff, text, 'on');
        }

    });

};

const ChangeConditionWithRegex = (input, regex, attr, minLength = 1) => {
    let re = regex.test(input.value);

    re && input.value.length > minLength
        ? ChangeStateEquals(input, attr, 'Не равны')
        : ChangeStateEquals(input, attr);
};


let inputLogin = document.querySelector("#login_registration");

inputPass.addEventListener('input', function () {
    let reg = /^\d+$/.test(this.value);

    reg
        ? ChangeStateEquals(this, "pass_equals_num")
        : ChangeStateEquals(
            this,
            "pass_equals_num",
            "Не равны"
        );

    if (this.value !== '' &&  this.value === inputLogin.value) {
        ChangeStateEquals(this, "pass_equals_with_login")
    } else if (this.value !== '') {
        ChangeStateEquals(
            this,
            'pass_equals_with_login',
            'Не равны'
        );
    }

    this.value.length < 8
        ? ChangeStateEquals(this, "pass_min_8_symbols")
        : ChangeStateEquals(
            this,
            'pass_min_8_symbols',
            'Не равны'
        );

});

confirmationPass.addEventListener('input', function () {
    if (this.value !== '' && inputPass.value !== '') {

        if (this.value === inputPass.value) {
            ChangeStateEquals(
                this,
                "pass_equals_with_pass",
                'Не равны'
            );
        } else {
            ChangeStateEquals(this, 'pass_equals_with_pass');
        }

    }
});

inputLogin.addEventListener('input', function () {
    let re = /^[a-zA-Zа-яА-Я0-9\-@.+_]+$/.test(this.value);

    if (re) {
        ChangeStateEquals(
            this,
            'login_with_symbol',
            'Не равны'
        );
    } else {
        ChangeStateEquals(this, 'login_with_symbol');
    }

    if (this.value.length > 4) {
        ChangeStateEquals(this, 'login_min_lenght', 'Не равны');
    } else {
        ChangeStateEquals(this, 'login_min_lenght');
    }
});

// Validate

// Name
let inputName = document.querySelector("#input_name");

inputName.addEventListener('input', function () {
    ChangeConditionWithRegex(
        this,
        /^.[A-Za-z0-9-^аА-яЯ-\s-]+$/,
        'name_with_symbol'
    );
});

// Surname
let inputLastName = document.querySelector("#input_last_name");

inputLastName.addEventListener('input', function () {
    ChangeConditionWithRegex(
        this,
        /^.[A-Za-z0-9-^аА-яЯ-\s-]+$/,
        'fam_with_symbol'
    );
});

let checkbox = document.querySelector("#consent_to_processing");

checkbox.addEventListener('change', function () {
    ValueCheckBox(this)
});

document.addEventListener("DOMContentLoaded", ValueCheckBox(checkbox));
OpenModalEnter();