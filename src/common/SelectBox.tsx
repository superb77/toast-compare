interface Props {
  selector: string;
  options: Array<string>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectBox({ selector, options, onChange }: Props) {
  return (
    <select
      id={selector}
      onChange={onChange}
      className="w-32 mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option selected>Select</option>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  )
}
