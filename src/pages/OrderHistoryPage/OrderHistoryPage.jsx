import * as userService from '../../utilities/users-service'

export default function OrderHistoryPage() {
  const handleClick = async () => {
    const expDate = await userService.checkToken()
    console.log(expDate)
  }

  return (
    <>
    <h1>OrderHistoryPage</h1>
    <button onClick={handleClick}>Check when my LogIn expires</button>
    </>
  );
}