import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { ChartPoint, PopulationData, prefLabel } from "../core/models";
import { usePrevious } from "../shared/usePrevious";

interface Props {
  data: PopulationData;
}

const Chart = ({ data }: Props) => {
  const [chartData, setChartData] = useState<ChartPoint[]>(); // チャートを描画するためのデータ
  const [prefList, setPrefList] = useState<prefLabel[]>(); // 都道府県名とチャートの色のリスト
  const prevPrefList = usePrevious(prefList);

  useEffect(() => {
    if (data.length === 0) {
      setChartData([]);
      setPrefList([]);
      return;
    }

    // 都道府県名のリストを生成
    const newPrefList: prefLabel[] = [];
    data.forEach(pref => {
      if (
        prevPrefList &&
        (prevPrefList as prefLabel[]).some(
          (prevPref: prefLabel) => prevPref.name === pref.prefName
        )
      ) {
        // 直前に表示していた都道府県は同じ色を使用する
        const prevPref = (prevPrefList as prefLabel[]).find(
          (prePref: prefLabel) => prePref.name === pref.prefName
        );
        prevPref && newPrefList.push(prevPref);
      } else {
        // 直前に表示していない都道府県は新しい色を割り当てる
        const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        newPrefList.push({
          name: pref.prefName,
          color
        });
      }
    });
    setPrefList(newPrefList);

    // チャート用データを整形
    const newChartData = [];
    for (let i = 0; i < data[0].values.length; i++) {
      const chartPoinst = { year: data[0].values[i].year };
      data.forEach(pref => {
        Object.assign(chartPoinst, {
          [`${pref.prefName}`]: pref.values[i].value
        });
      });
      newChartData.push(chartPoinst);
    }
    setChartData(newChartData);
  }, [, data]);

  return (
    <LineChart
      className="chart"
      width={document.body.offsetWidth - 20}
      height={400}
      data={chartData}
    >
      {prefList &&
        prefList.map(pref => (
          <Line
            key={pref.name}
            type="monotone"
            dataKey={pref.name}
            stroke={pref.color}
          />
        ))}
      <XAxis
        dataKey="year"
        label={{ value: "年度", position: "insideRight", dy: -30 }}
      />
      <YAxis
        label={{ value: "人口数", position: "insideTop", dx: 70 }}
        tick={{ fontSize: 10 }}
      />
    </LineChart>
  );
};

export default Chart;
