import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PwUpdate from './pages/PwUpdate';
import PwUpdateNoti from './pages/PwUpdateNoti';

export default function App() {
  return (
    <>
      {/* <Navbar /> */}
      {/* <Footer /> */}
      <div className='m-20'>
        {/* <PwUpdate /> */}
        <PwUpdateNoti />
      </div>
    </>
  );
}
