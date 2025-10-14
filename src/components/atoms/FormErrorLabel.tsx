type Props = {
  errMsg?: string;
};

export function FormErrorLabel({ errMsg }: Props) {
  if (!errMsg) return <></>;
  return (
    <div className="text-sm w-full text-red-500 break-words">* {errMsg}</div>
  );
}
