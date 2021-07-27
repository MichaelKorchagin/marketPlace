import {User} from "../src/user";
import {usd, rub, seller, buyer} from "../src/constant";
import assert from "assert";

describe('user', () => {
    it('should create user object with initial balance (constructor)', () => {

        const user = new User(100, usd);

        assert.equal(user.balance[usd],100);
    });

    it ('should create user object and make a deposit to the balance (methodDeposit)', () => {

        const user = new User (100, usd);
        user.methodDeposit(200, usd);
        assert.equal(user.balance[usd], 300);
    });

    it ('should create user object and with draw money from balance (methodWithDraw)', () => {
        const user = new User (100, usd);
        user.methodWithDraw(50, usd);
        assert.equal(user.balance[usd], 50);
    });

    it ('should create user object and cancel the withdrawal operation (methodWithDraw) *NEGATIVE*', () => {
        const user = new User (100, rub);
        try {
            user.methodWithDraw(200, rub);
            // ассерт.ок не запускается, потому что ожадется ошибка (переходим на catch)
            assert.ok(false, 'Должно было упасть, но не упало');
        } catch (e) {
            assert.equal(e.message, 'Мало денег, жидло!');
        }
    });

    it('should create user object and (ONLY) create his order. must have type of order, type underlying currency and order size (methodCreateOrder)', () => {
        const user = new User (100, rub);

        // хочет продать 10 бачей
        user.methodCreateOrder(seller,usd,10);

        assert.equal(user.order.orderType, seller);
        assert.equal(user.order.underlyingType, usd);
        assert.equal(user.order.size, 10);
    });
});
