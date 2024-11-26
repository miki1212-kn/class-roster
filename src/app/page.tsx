"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

const ClassRosterPage = () => {
  const [classList, setClassList] = useState<any[]>([]);
  const [filteredClassList, setFilteredClassList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("--");

  useEffect(() => {
    async function fetchClassList() {
      try {
        const res = await fetch(
          "http://localhost:8080/classRoster_backend/api/classlist/index.php"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("APIレスポンス:", data); // レスポンス確認
        setClassList(data[0]);
        setFilteredClassList(data[0]); // 初期状態では全データを表示
      } catch (error) {
        console.error("エラー:", error);
        setError("データの取得に失敗");
      } finally {
        setLoading(false);
      }
    }
    fetchClassList();
  }, []);

  // 選択肢が変更されたときのハンドラー
  const handlePositionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const position = event.target.value;
    setSelectedPosition(position);

    if (position === "--") {
      setFilteredClassList(classList); // すべて表示
    } else {
      const filtered = classList.filter(
        (student) => student.position === position
      );
      console.log("フィルタリング後のデータ:", filtered); // フィルタリング結果を確認
      setFilteredClassList(filtered);
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
        <form>
          <select
            name="position"
            id="position"
            value={selectedPosition}
            onChange={handlePositionChange}
          >
            <option value="--">--</option>
            <option value="designer">designer</option>
            <option value="engineer">engineer</option>
            <option value="director">director</option>
          </select>
        </form>
      </div>

      {/* 絞り込まれたクラスリストを表示 */}
      {filteredClassList.length > 0 ? (
        <ul className={styles.classListContainer}>
          {filteredClassList.map((student, index) => (
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
        <p>指定されたポジションに一致する学生はいません。</p>
      )}
    </div>
  );
};

export default ClassRosterPage;
