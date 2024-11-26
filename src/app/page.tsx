"use client";

import { log } from "console";
import React, { use, useEffect, useState } from "react";
// import ClassRoster from "./components/ClassRoster";
// import Link from "next/link";
// import styles from "./styles.module.scss";

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
        console.log(res);
        //resをjsonに変換
        const data = await res.json();
        setClassList(data);
        console.log("APIレスポンス:", data); //返ってきてた！
      } catch (error) {
        console.error("エラー:", error);
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
    <>
      <h1>クラス名簿</h1>
      {/* classListのlengthが０より大きい時 */}
      {classList.length > 0 ? (
        <ul>
          {classList.map((student, index) => (
            <li key={index}>{student.name}</li>
          ))}
        </ul>
      ) : (
        <p>クラス名簿はありません。</p>
      )}
    </>
  );
};

export default ClassRosterPage;
