import { useEffect, useState } from "react";
import "./App.css";
import { getPrefectures } from "./core/api";
import { PrefecturesState } from "./core/models";
import Forms from "./components/Forms";

const App = () => {
  const [prefState, setPrefState] = useState<PrefecturesState>({});

  // 最初に都道府県データを取得
  useEffect(() => {
    const init = async () => {
      const res = await getPrefectures();
      if (res instanceof Error) {
        console.log("error");
        return;
      }
      // データ整形
      const data = {};
      Object.keys(res).forEach(k => {
        const key = parseInt(k, 10);
        Object.assign(data, {
          [`${res[key].prefCode}`]: {
            prefName: res[key].prefName,
            checked: false
          }
        });
      });
      setPrefState(data);
    };
    init().catch(err => console.log(err));
  }, []);

  useEffect(() => {
    console.log("prefecturesState updated");
  }, [prefState]);

  return (
    <div className="App">
      <div className="title">ゆめみコーディングテスト</div>
      <Forms prefState={prefState} setPrefState={setPrefState} />
    </div>
  );
};

export default App;
