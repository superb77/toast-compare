import { useState } from 'react';
import { Id, toast } from 'react-toastify';
import { Button } from 'common';

export function TostifyDismissToast() {
  const [prevToastId, setPrevToastId] = useState<Id>("");

  const onClick = () => { 
    if (prevToastId) toast.dismiss(prevToastId); 
    // toast.dismiss() 모든 토스트를 제거합니다.

    // 토스트 아이디를 반환합니다.
    const toastId = toast('Wow so easy !', {
      icon: '🦄',
    });

    setPrevToastId(toastId);
  }

  return (
    <div className="mt-5">
      <h3 className="mb-2">쌓이지 않는 토스트</h3>
      <Button onClick={onClick} />
    </div>
  )
}
