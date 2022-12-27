export function Button({ onClick }: { onClick: () => void}) {
  return (
    <button
      type="button"
      className="w-28 h-12 rounded-lg bg-green-500 text-white"
      onClick={onClick}
    >
     토스트 생성
    </button>
  )
}
