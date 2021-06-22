"use strict"

let userForm = new UserForm();

userForm.loginFormCallback = (data) => ApiConnector.login(data, (response) => {
    if (response.success === false) {
        userForm.setLoginErrorMessage(response.error);
    } else {
        userForm.setLoginErrorMessage("Добро пожаловать на биржу неткоинов!");
        location.reload();
}});

userForm.registerFormCallback = (data) => ApiConnector.register(data, (response) => {
    if (response.success === false) {
        userForm.setRegisterErrorMessage(response.error);
    } else {
        location.reload();
        userForm.setRegisterErrorMessage("Добро пожаловать на биржу неткоинов!");
}});
