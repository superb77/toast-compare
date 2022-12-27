import { useState } from 'react';
import { Button } from 'common';
import toast, { useToaster } from 'react-hot-toast/headless';

export function HotDismissToast() {
  const [prevToastId, setPrevToastId] = useState<string>("");
  const { toasts } = useToaster();
  

  const onClick = () => { 
    if (prevToastId) toast.remove(prevToastId); 
    
    // 토스트 아이디를 반환합니다.
    let toastId = toast('Wow so easy !', {
      duration: 3000,
      icon: '🦄',
    });

    setPrevToastId(toastId);
  }

  return (
    <div className="mt-5">
      <h3 className="mb-2">쌓이지 않는 토스트</h3>
      {toasts
        .filter((toast) => toast.visible)
        .map((toast) => (
          <div
            key={toast.id}
            className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 rounded-md"
            {...toast.ariaProps}>
            <>
              {toast.message || 'No message'}
            </>
          </div>
        ))}
      <Button onClick={onClick} />
    </div>
  )
}
