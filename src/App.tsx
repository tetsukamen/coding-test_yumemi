import { useEffect, useState } from "react";
import "./App.css";
import { getPrefecturePopulation, getPrefectures } from "./core/api";
import { PopulationData, PrefecturesState } from "./core/models";
import Forms from "./components/Forms";
import Chart from "./components/Chart";
import { usePrevious } from "./shared/usePrevious";

const App = () => {
  const [prefState, setPrefState] = useState<PrefecturesState>({}); // フォームの状態を保持
  const prevPrefState = usePrevious(prefState); // フォームの直前の状態を保持
  const [populationData, setPopulationData] = useState<PopulationData>([]); // 人口データを保持

  // 最初に都道府県データを取得
  useEffect(() => {
    const init = async () => {
      const res = await getPrefectures();
      if (res instanceof Error) {
        console.log("error");
        return;
      }
      // データ整形
      const prefData = {};
      Object.keys(res).forEach(k => {
        const key = parseInt(k, 10);
        Object.assign(prefData, {
          [`${res[key].prefCode}`]: {
            prefName: res[key].prefName,
            checked: false
          }
        });
      });
      setPrefState(prefData);
    };
    init().catch(err => console.log(err));
  }, []);

  // フォームの状態変化を検知して動作
  // 差分を検知し、ローカルの人口データを追加・削除する
  useEffect(() => {
    const fetchPopulationData = async () => {
      for (const key of Object.keys(prefState)) {
        const prefNumber = parseInt(key, 10);
        const targetPrefState = prefState[prefNumber];
        const prefName = targetPrefState.prefName;
        if (targetPrefState !== prevPrefState![prefNumber]) {
          if (targetPrefState.checked) {
            // 選択中の都道府県が増加した場合
            const res = await getPrefecturePopulation(prefNumber);
            if (res instanceof Error) {
              console.log("error");
              return;
            }
            const newPopulationData = [
              ...populationData,
              { prefName, values: res }
            ];
            setPopulationData(newPopulationData);
          } else {
            // 選択中の都道府県が減少した場合
            const newPopulationData = populationData.filter(
              data => data.prefName !== prefName
            );
            setPopulationData(newPopulationData);
          }
        }
      }
    };
    fetchPopulationData().catch(err => console.log(err));
  }, [prefState]);

  return (
    <div className="App">
      <div className="title">ゆめみコーディングテスト</div>
      <Forms prefState={prefState} setPrefState={setPrefState} />
      <Chart data={populationData} />
    </div>
  );
};

export default App;
