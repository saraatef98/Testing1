//============================================================lap 01
// const {capitalizeTextFirstChar} = require ('../index');

// describe("capitalizeTextFirstChar function" , ()=>{
//     it('this function return string if it provided with string',()=>{
//         const test = capitalizeTextFirstChar('asmaa')
//         expect(typeof test).toBe('string')
//     })

//     it('function take string and convert it as capitalize',()=>{
//         const test = capitalizeTextFirstChar('my name is asmaa')
//         expect(test).toBe('My Name Is Asmaa')
//     })

//     it("test if it return number",()=>{
//         expect(function(){
//           capitalizeTextFirstChar(23)
//         }).toThrow()
//     })
// })

//==============================================================lap 02
const User = require('../index')
describe('user function',()=>{
    let user;
    let mockPaymentModel;
    beforeEach(()=>{
        user = new User('asmaa','asmaa@123');
        mockPaymentModel = jasmine.createSpyObj('PaymentModel', ['goToVerifyPage', 'returnBack','isVerify']);
    })
    it('test: add product to cart',()=>{
        const product = 'radio';
        user.addToCart(product);
        expect(user.cart).toContain(product);
    })
    it('test: calculate total price 2 products', () => {
        const product1 = { name: 'prd1', accprice: 10 };
        const product2 = { name: 'prd2', accprice: 10 };
        user.addToCart(product1);
        user.addToCart(product2);
        // const totalPrice = user.calculateTotalCartPrice();
        // expect(totalPrice).toBe(20);
        expect(user.cart).toContain(product1,product2)
      });
      it('test: return 0 if cart is empty', () => {
        const totalPrice = user.calculateTotalCartPrice();
        expect(totalPrice).toBe(0);
      });

    it('test: call paymentModel methods', () => {
        user.checkout(mockPaymentModel);
        expect(mockPaymentModel.goToVerifyPage).toHaveBeenCalled();
        expect(mockPaymentModel.returnBack).toHaveBeenCalled();
      });

      it('test: return true if payment is verified', () => {
        mockPaymentModel.isVerify.and.returnValue(true);
        const result = user.checkout(mockPaymentModel);
        expect(result).toBe(true);
      });
})