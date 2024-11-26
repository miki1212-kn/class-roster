"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const StudentDetails = () => {
  const router = useRouter();
  const { studentId } = router.query; //urlからidを取得

  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!studentId) return;

    //studentIdがある場合データをフェッチ
    async function fetchStudentDetails() {
      try {
        const res = await fetch(
          `http://localhost:8080/classRoster_backend/api/getStudentById.php?id=${studentId}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setStudent(data);
      } catch (error) {
        setError("学生情報の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    }
    fetchStudentDetails();
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
