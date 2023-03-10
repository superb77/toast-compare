import { Toaster } from 'react-hot-toast';
import { Layout } from 'common';
import { HotStatusToast, HotCustomToast, HotDismissToast } from 'components';


export function HotToast() {
  return (
    <Layout title="react-hot-toast" path="toastify">
      <div className="w-full h-full flex flex-col">
        <HotStatusToast />
        <HotCustomToast />
        <HotDismissToast />
      </div>
      <Toaster />
    </Layout>
  )
}
