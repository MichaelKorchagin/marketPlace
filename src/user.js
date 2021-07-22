export class User {
    // balance = {
    //     [usd]: null,
    //     [rub]: null,
    // };

    // заказ в котором все хранится
    // order = {
    //     // seller or buyer
    //     orderType: null,
    //
    //     // тип главной валюты (главная = ценник)
    //     underlyingType: null,
    //
    //     // размер заказа (сколько просим главной валюты)
    //     size: null,
    // };

    constructor(_balance, _currencyType) {
        if (!this.balance) {
            this.balance = {};
        }
        this.balance[_currencyType] = _balance;
    }

    methodDeposit (amount, currencyType) {
        // вносим бабки
        this.balance[currencyType] = this.balance[currencyType] + amount;
    }

    methodWithDraw (amount, currencyType) {
        // теряем бабки (снимаем со счета)
        if (this.balance[currencyType] >= amount) {
            this.balance[currencyType] = this.balance[currencyType] - amount;
        } else {
            throw new Error('Мало денег, жидло!');
        }
    }

    methodCreateOrder (_orderType, _underlyingType, _size) {
        if (!this.order) {
            this.order = {};
        }
        this.order.orderType = _orderType;
        this.order.underlyingType = _underlyingType;
        this.order.size = _size;
    }

    getBalanceInCurrency (currencyType) {
        return this.balance[currencyType];
    }
}
