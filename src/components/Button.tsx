export default function Button({
  children,
  textOnly,
  className,
  ...props
}: any) {
  let cssCls = textOnly ? "text-button" : "button";
  cssCls += " " + className;
  return (
    <button className={cssCls} {...props}>
      {children}
    </button>
  );
}
