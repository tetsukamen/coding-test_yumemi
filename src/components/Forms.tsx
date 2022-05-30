import { PrefecturesState } from "../core/models";
import Checkbox from "./Checkbox";

interface Props {
  prefState: PrefecturesState;
  setPrefState: (prefState: PrefecturesState) => void;
}

const Forms = ({ prefState, setPrefState }: Props) => {
  // prefecturesStateを更新する
  const toggleCheckbox = (prefNumber: number) => {
    const targetPref = Object.assign({}, prefState[prefNumber]);
    Object.assign(targetPref, { checked: !targetPref.checked });
    const currentPrefState = Object.assign({}, prefState);
    const updatedPrefState = Object.assign(currentPrefState, {
      [`${prefNumber}`]: targetPref
    });
    setPrefState(updatedPrefState);
  };

  return (
    <div className="forms">
      <div className="formTitle">都道府県</div>
      <div className="formsWrapper">
        {Object.keys(prefState).map(key => {
          const prefNumber = parseInt(key, 10);
          const pref = prefState[prefNumber];
          return (
            <div key={prefNumber}>
              <Checkbox
                label={pref.prefName}
                checked={pref.checked}
                toggleCheckbox={() => {
                  toggleCheckbox(prefNumber);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forms;
