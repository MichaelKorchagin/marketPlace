import { seller, buyer, usd, rub } from "../src/constant";
import { User } from "../src/user";
import { MarketPlace } from "../src/marketPlace";
import assert from "assert";


describe('marketPlace', ()=> {
   it('Should create new order and set variable values in order (constructor)', ()=> {

       const marketPlace = new MarketPlace (30, usd, 30);

       assert.equal(marketPlace.price, 30);
       assert.equal(marketPlace.priceCurrency, 30);
       assert.equal(marketPlace.underlyingCurrency, usd);

   });

   it('Should make a deal with balance calculation (methodTrade) POSITIVE', ()=> {

       const priceCurrency = rub;
       const price = 30;
       const underlyingCurrency = usd;
       const orderSize = 1;

       const user1 = new User(100, rub);
       user1.methodDeposit(500, usd);
       user1.methodCreateOrder(seller, underlyingCurrency, orderSize);

       const user2 = new User(250, usd);
       user2.methodDeposit(1000, rub);
       user2.methodCreateOrder(buyer, underlyingCurrency, orderSize + 1);

       const startBalance1USD = user1.getBalanceInCurrency(usd);
       const startBalance2USD = user2.getBalanceInCurrency(usd);
       const startBalance1RUB = user1.getBalanceInCurrency(rub);
       const startBalance2RUB = user2.getBalanceInCurrency(rub);

       const marketPlace = new MarketPlace (price, underlyingCurrency, priceCurrency);

       marketPlace.methodTrade(user1, user2);

       const payInRub = price * orderSize;
       const finishBalance1USD = user1.getBalanceInCurrency(usd);
       const finishBalance2USD = user2.getBalanceInCurrency(usd);
       const finishBalance1RUB = user1.getBalanceInCurrency(rub);
       const finishBalance2RUB = user2.getBalanceInCurrency(rub);

       assert.equal(startBalance1USD - finishBalance1USD, orderSize);
       assert.equal(finishBalance1RUB - startBalance1RUB, payInRub);
       assert.equal(finishBalance2USD - startBalance2USD, orderSize);
       assert.equal(startBalance2RUB - finishBalance2RUB, payInRub);

   });
});
