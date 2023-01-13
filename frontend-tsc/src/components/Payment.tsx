import PocketBase from 'pocketbase'
const pb = new PocketBase('https://pb.jjus.dev');

export default function Payment() {
    var userId = pb.authStore.model!.id
    var link = "https://stripe.jjus.dev/create-checkout-session?name=Test 1&course=r4sagx5tir37z4l&price=100&user=" + userId


  return (
    <div>
        <form action={link} method='POST'>
            <button type='submit'>Checkout</button>
        </form>
    </div>
  );
}