import Head from 'next/head';
import Navbar from '../components/navbar';
import { RecoilRoot } from 'recoil';
import Router from 'next/router';

// show ui loading with nprogress
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  let path = ""
  process.browser ?  path = location.pathname : null

  return(
    <div>
      <Head>
        <title>Smart Friends</title>
      </Head>

      {(path === "/login" || path === "/register" || path === "/createprofile") ? null : <Navbar></Navbar>}

      <div className="containerApp">
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </div>

      <style jsx global>{`
        body{
          margin: 0;
          padding: 0;
          position: relative;
          overflow-x: hidden;
          height: 100%;
        }

        .containerApp{
          position: relative;
          top: ${(path === "/login" || path === "/register" || path === "/createprofile") ? '0px' : '75px'};
        }

        @media only screen and (max-width: 700px){
          .containerApp{
            top: ${(path === "/login" || path === "/register" || path === "/createprofile") ? '0px' : '61px'};
          }
        }

        @media only screen and (max-width: 420px){
          .containerApp{
            top: ${(path === "/login" || path === "/register" || path === "/createprofile") ? '0px' : '51px'};
          }
        }

        /* width */
        ::-webkit-scrollbar {
          width: 10px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          background: rgb(210, 210, 210);
        }
        
        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: rgb(25, 25, 50);
          border-radius: 0px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: rgb(50, 50, 75);
        }

        ::-webkit-scrollbar-thumb:active {
          background: #C2033D;
        }
      `}</style>
    </div>
  )
}

export default MyApp