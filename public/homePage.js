"use strict"

//выход из личного кабинета
let logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout((response) => {
    if (response.success === true) {
        location.reload();
    }
})


//Получение информации о пользователе
let currentUser = () => ApiConnector.current((data) => { 
    if (data.success) {
        ProfileWidget.showProfile(data.data);
    }
})

currentUser();


//Получение текущих курсов валюты
let ratesBoard = new RatesBoard;

ratesBoard.action = () => ApiConnector.getStocks((data) => {
    if (data.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(data.data);
    }
})
ratesBoard.action();
setInterval(() => ratesBoard.action(), 60000);


//Операции с деньгами
let moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "Операция проведена успешно");
    } else {
        moneyManager.setMessage(response.success, response.error);
    }
})

moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "Операция проведена успешно");
    } else {
        moneyManager.setMessage(response.success, response.error);
    }
})

moneyManager.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "Операция проведена успешно");
    } else {
        moneyManager.setMessage(response.success, response.error);
    }
    
    console.log(response);
})


//Работа с избранным
let favoritesWidget = new FavoritesWidget;

favoritesWidget.action = () => ApiConnector.getFavorites((data) => {
    if (data.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data.data);
        moneyManager.updateUsersList(data.data);
    }
})
favoritesWidget.action();

favoritesWidget.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response.success, "Пользователь успешно добавлен");
    } else {
        favoritesWidget.setMessage(response.success, response.error);
    }
})

favoritesWidget.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response.success, "Пользователь успешно удалён");
    } else {
        favoritesWidget.setMessage(response.success, response.error);
    }
})