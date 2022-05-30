interface Props {
  label: string;
  checked: boolean;
  toggleCheckbox: () => void;
}

const Checkbox = ({ label, checked, toggleCheckbox }: Props) => {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={toggleCheckbox}
        id={label}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
export default Checkbox;
