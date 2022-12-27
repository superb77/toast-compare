import { ToastContainer } from 'react-toastify';
import { Layout } from 'common';
import { TostifyStatusToast, TostifyCustomToast } from 'components'; 
import "react-toastify/dist/ReactToastify.css";



export function Toastify() {
  return (
    <Layout title="react-toastify" path="hot-toast">
      <div className="w-full h-full flex flex-col">
        <TostifyStatusToast />
        <TostifyCustomToast />
      </div>
      <ToastContainer />
    </Layout>
  )
}
