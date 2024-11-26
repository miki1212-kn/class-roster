"use client";

import React, { use, useEffect, useState } from "react";
// import ClassRoster from "./components/ClassRoster";
import Link from "next/link";
import styles from "./styles.module.scss";

const ClassRosterPage = () => {
  const [classList, setClassList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
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
        <form>
          <select name="position" id="position">
            <option value="designer">designer</option>
            <option value="engineer">engineer</option>
            <option value="directer">directer</option>
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
