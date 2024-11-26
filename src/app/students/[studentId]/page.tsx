"use client";

// import React, { useReducer } from "react";
// import Link from "next/link";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const StudentDetails = () => {
  const router = useRouter();
  const { studentId } = router.query; //urlからidを取得

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //studentIdがある場合データをフェッチ
    if (studentId) {
      setLoading(true);
      fetch(
        `http://localhost:8080/classRoster_backend/api/getStudentById.php?id={studentId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setStudent(data);
          setLoading(false);
        })
        .catch((error) => {
          setError("学生情報の取得に失敗");
          setLoading(false);
        });
    }
  }, [studentId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!student) {
    return <p>学生情報が見つかりません。</p>;
  }

  return (
    <>
      <h1>学生情報</h1>
      <p>出席番号：{student.id}</p>
      <p>名前：{student.name}</p>
    </>
  );
};

export default StudentDetails;
