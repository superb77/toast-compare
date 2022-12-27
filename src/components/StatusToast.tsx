import { useState } from 'react';
import { Button, SelectBox } from 'common';
import toast from 'react-hot-toast';

export function StatusToast() {
  const [status, setStatus] = useState<string>("");

  const options = [
    "blank",
    "error",
    "success",
    "custom"
  ]

  const onClick = () => { 
    switch (status) {
      case "blank":
        toast('Wow so easy !');
        break;
      case "error":
        toast.error('Wow so easy !');
        break;
      case "success":
        toast.success('Wow so easy !');
        break;
      case "custom":
        toast('Wow so easy !', {
          icon: '🦄',
        });
        break;
      default:
        break;
    }
  }
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value);

  return (
    <div className="mt-5">
      <h3>상태에 따른 토스트</h3>      
      <div className="w-full flex items-end">
        <SelectBox
          selector="status"
          options={options}
          onChange={onChange}
        />
        <Button onClick={onClick} />
      </div>
    </div>
  )
}