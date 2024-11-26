"use client";

import React, { use, useEffect, useState } from "react";
// import ClassRoster from "./components/ClassRoster";
import Link from "next/link";
import styles from "./styles.module.scss";
// import { console } from "inspector";

const ClassRosterPage = () => {
  const [classList, setClassList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  // const [filteredList, setFilteredList] = useState<any[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string>("--");

  useEffect(() => {
    //初期状態は全クラスリストを表示
    async function fetchClassList() {
      try {
        //apiエンドポイントを呼び出す
        const res = await fetch(
          "http://localhost:8080/classRoster_backend/api/classlist/index.php"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        // console.log(res);
        //resをjsonに変換
        const data = await res.json();
        //dataの中に配列がある状態で返ってきてるので、classListには最初のdata[0]をセットする
        setClassList(data[0]);
        //配列で返ってきてる
        console.log("APIレスポンス:", data);
      } catch (error) {
        console.error("エラー:", error);
        setError("データの取得に失敗");
      } finally {
        //ローディング終了
        setLoading(false);
      }
    }
    fetchClassList();
  }, []);

  //選択肢が変更するハンドラー
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //ページ遷移を防ぐ
    event.preventDefault();

    // const position = event.target.value;
    // setSelectedPosition(position);

    if (selectedPosition === "--") {
      //optionが--の場合は全部表示
      // setFilteredList(classList);

      try {
        const res = await fetch(
          "http://localhost:8080/classRoster_backend/api/classlist/index.php"
        );
        if (!res.ok) {
          throw new Error(`エラー: ${res.status}`);
        }
        const data = await res.json();
        setClassList(data[0]);
      } catch (error) {
        console.error("エラー", error);
        setError("データ取得失敗");
      }

      return;
      // else {
      //   setFilteredList(
      //     classList.filter((student) => student.position === position)
      //   );
      // }
    }

    //選択したpositionのvalueに基づいてフィルタリング
    try {
      const res = await fetch(
        `http://localhost:8080/classRoster_backend/api/classlist/index.php?position=${selectedPosition}`
      );
      if (!res.ok) {
        throw new Error(`接続エラー: ${res.status}`);
      }
      //絞り込んだデータをセット
      const data = await res.json();
      console.log(data);

      setClassList(data);
    } catch (error) {
      console.error("エラー:", error);
      setError("データ取得失敗");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className={styles.container}>
      <h1>クラス名簿</h1>

      <div className={styles.headContainer}>
        <form onSubmit={handleSubmit}>
          <select
            name="position"
            id="position"
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
          >
            <option value="--">--</option>
            <option value="designer">designer</option>
            <option value="engineer">engineer</option>
            <option value="director">director</option>
          </select>
          <input type="submit" value="絞り込む" />
        </form>
      </div>
      {/* classListのlengthが０より大きい時 */}
      {classList.length > 0 ? (
        <ul className={styles.classListContainer}>
          {classList.map((student, index) => (
            <li key={index}>
              <div className={styles.classListWrap}>
                <p className={styles.id}>{student.id}</p>
                <p className={styles.name}>{student.name}</p>
                <p className={styles.studentNumber}>{student.studentNumber}</p>
                <p className={styles.position}>{student.position}</p>
              </div>

              <Link href={`/students/${student.id}`} className={styles.moreBtn}>
                more
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>クラス名簿はありません。</p>
      )}
    </div>
  );
};

export default ClassRosterPage;
