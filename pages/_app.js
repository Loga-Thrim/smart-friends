import Navbar from '../components/navbar';

function MyApp({ Component, pageProps }) {
  let path = ""
  process.browser ?  path = location.pathname : null

  return(
    <div>
      {(path === "/login" || path === "/register") ? null : <Navbar></Navbar>}

      <div className="container">
        <Component {...pageProps} />
      </div>

      <style jsx global>{`
        body{
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .container{
          position: relative;
          top: ${(path === "/login" || path === "/register") ? '0px' : '72px'};
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
      `}</style>
    </div>
  )
}

export default MyApp