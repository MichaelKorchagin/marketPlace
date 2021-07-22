import { seller } from "./constant";

export class MarketPlace {

    constructor(_price, _underlyingCurrency, _priceCurrency) {
        // побочная валюта (тип)
        this.priceCurrency = _priceCurrency;
        // главная валюта
        this.underlyingCurrency = _underlyingCurrency;
        // цена главной валюты (в побочной)
        this.price = _price;
    }

    methodTrade (user1,user2) {

        // определить селлера и баера +
        // определить главную валюту +
        // кол-во главной валюты в сделке +
        // посчитать кто сколько получит и потеряет +
        // выполнить проверку баланса +
        // у одного забрать, у другого добавить +

        let tradeSize = null;

        // выбираем размер сделки. если у одного заказ меньше - берем его
        if (user1.order.size <= user2.order.size) {
            tradeSize = user1.order.size;
        }
        else {
            tradeSize = user2.order.size;
        }

        // сколько каждому нужно заплатить для сделки (ПЛАНИРОВАНИЕ расходов обоих)
        const sellerNeedPay = tradeSize;
        const buyerNeedPay = tradeSize * this.price;

        // далее выбираем селлера и байера
        let _seller;
        let _buyer;
        if (user1.order.orderType === seller) {
            _seller = user1;
            _buyer = user2;
        }
        else {
            _seller = user2;
            _buyer = user1;
        }

        // проверяем хватает ли средств у обоих сразу (Или U)
        if (_buyer.balance < buyerNeedPay || _seller.balance < sellerNeedPay) {
            throw new Error('Мало денег, жидло!');
        }

        // проводим транзакции
        _seller.balance[this.underlyingCurrency] = _seller.balance[this.underlyingCurrency] - sellerNeedPay;
        _seller.balance[this.priceCurrency] = _seller.balance[this.priceCurrency] + buyerNeedPay;
        _buyer.balance[this.underlyingCurrency] = _buyer.balance[this.underlyingCurrency] + sellerNeedPay;
        _buyer.balance[this.priceCurrency] = _buyer.balance[this.priceCurrency] - buyerNeedPay;
    }
}
