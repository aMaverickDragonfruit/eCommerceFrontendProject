export default function NavOptions({ isAuth }) {
  if (isAuth) {
    return <div>user signed in</div>;
  }
  return <div>user didn't sign in</div>;
}
