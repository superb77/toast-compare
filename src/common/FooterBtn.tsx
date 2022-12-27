import { useNavigate } from 'react-router-dom';

export function FooterBtn({ path }: { path: string }) { 
  const navigate = useNavigate();

  const onClick = () => navigate(`/${path}`);

  return (
    <div className="w-11/12 rounded-2xl bg-green-500 py-4 mb-7">
      <button
        type="button"
        className="w-full text-white flex justify-center"
        onClick={onClick}
      >
        다음
      </button>
    </div>
  )
}
