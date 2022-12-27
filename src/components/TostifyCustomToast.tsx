import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, SelectBox } from 'common';

type Position = "top-right" | "top-center"| "top-left" | "bottom-right"|  "bottom-center" | "bottom-left";

export function TostifyCustomToast() {
  const [position, setPosition] = useState<Position>("top-right");

  const options = [
    "top-right",
    "top-center",
    "top-left",
    "bottom-right",
    "bottom-center",
    "bottom-left",
  ];

  const getPosition = () => {
    switch (position) { 
      case "top-right":
        return toast.POSITION.TOP_RIGHT;
      case "top-center":
        return toast.POSITION.TOP_CENTER;
      case "top-left":
        return toast.POSITION.TOP_LEFT;
      case "bottom-right":
        return toast.POSITION.BOTTOM_RIGHT;
      case "bottom-center":
        return toast.POSITION.BOTTOM_CENTER;
      case "bottom-left":
        return toast.POSITION.BOTTOM_LEFT;
      default:
        return toast.POSITION.TOP_RIGHT;
    }
  }

  const onClick = () => {
    toast("Custom Toast", {
      position: getPosition(),
      draggable: true, // 드래그 해서 삭제
      autoClose: 3000, // 3초 후 자동으로 닫힘
      closeOnClick: true, // 클릭 시 닫힘
    });
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
