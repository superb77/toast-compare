import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button, SelectBox } from 'common';

type Position = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export function CustomToast() {
  const [position, setPosition] = useState<Position>("top-left");

  const options = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ]

  const onClick = () => {
    // 커스텀 토스트의 경우 기본 스타일이 적용되지 않는다.
    toast.custom(
      (t) => (
        <div
          className="rounded-md bg-white shadow-lg p-4"
          // style={} 스타일도 따로 지정 가능
        >
          <p className="font-bold">Custom Toast</p>
          <p className="text-sm">With some description</p>
          <button className="text-blue-300" onClick={() => toast.dismiss(t.id)}>Dismiss</button>
        </div>
      ),
      {
        duration: 3000,
        position: position,
        icon: '🦄',
      }
    );
  }
  
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPosition(e.target.value as Position);


  return (
    <div className="mt-5">
      <h3>커스텀 토스트</h3>      
      <div className="w-full flex items-end">
        <SelectBox
          selector="position"
          options={options}
          onChange={onChange}
        />
        <Button onClick={onClick} />
      </div>
    </div>
  )

}
