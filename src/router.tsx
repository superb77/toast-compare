import { Navigate, Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import { Start, HotToast, Toastify } from 'pages';

export default function Router() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Start />} />
      <Route path="/hot-toast" element={<HotToast />} />
      <Route path="/toastify" element={<Toastify />} />
      <Route path="*"  element={<Navigate replace to="/" />} />
    </ReactRouterRoutes>
  )
}
