import getStripe from './Variables/getStripe';
export default function Payment() {


  return (
    <div>
        <form action="http://localhost:4242/create-checkout-session" method='POST'>
            <button type='submit'>Checkout</button>
        </form>
    </div>
  );
}