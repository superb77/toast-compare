import { Top, Button } from 'components';

interface Props {
  title: string;
  path: string;
  children: React.ReactNode;
}

export function Layout({ title, path, children }: Props) {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <Top title={title} />
      <div className="flex flex-1 w-full p-6">
        {children}
      </div>
      <div className="flex flex-col items-center">
        <Button path={path} />
      </div> 
    </div>
  )
}
