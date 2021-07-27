export default class User {
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
        if (!this.balance) {                    // this для контекста класса (включая методы)
            this.balance = {};
        }
        this.balance[_currencyType] = _balance;
    }

    methodDeposit (amount, currencyType) {
        // вносим бабки
        if (typeof this.balance[currencyType] === "undefined") {
            this.balance[currencyType] = amount;
        } else {
            this.balance[currencyType] = this.balance[currencyType] + amount;
        }
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

        this.order.currentDate = new Date();
        const dd = String(this.order.currentDate.getDate());
        const mm = String(this.order.currentDate.getMonth());
        const yyyy = String(this.order.currentDate.getFullYear());
        const hr = String(this.order.currentDate.getHours());
        const min = String(this.order.currentDate.getMinutes());

        this.order.currentDate = dd + '/' + mm + '/' + yyyy + '   ' + hr + ':' + min;

        this.order.orderStatus = "open";
    }

    getBalanceInCurrency (currencyType) {
        return this.balance[currencyType];
    }
}

// клиент создает ордер
// клиент отправляет ордер на рынок
// рынок обновляет ордербук (проверяем весь)
// рынок ищет пару
// если нашел проводит транзакцию
// поиск по филду в ордербуке
//
// проверить:
// 1.Ордер(филды)
// 2. Если есть пара, у них меняются балансы
// 3. Все ордеры есть в ордербуке
// 4. 1 рынок, 5 юзеров, по 3 ордера (10 = open, 5 = closed)