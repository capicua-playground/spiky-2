type WfButtonProps = {
  label: string;
  primary?: boolean;
};

export function WfButton({ label, primary }: WfButtonProps) {
  return (
    <div
      className={`inline-block px-7 py-3 text-[13px] ${primary ? "wf-btn-primary" : "wf-btn-secondary"}`}
    >
      {label}
    </div>
  );
}
