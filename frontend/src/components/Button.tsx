interface IButtonProps {
  text?: string;
}

export function Button(props: IButtonProps) {
  return (
    <button>{props.text || 'default'}</button>
  );
}