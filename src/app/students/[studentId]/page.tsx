// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// const StudentDetails = () => {
//   const router = useRouter();
//   const { studentId } = router.query; //urlからidを取得

//   const [student, setStudent] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     if (!studentId) return;

//     //studentIdがある場合データをフェッチ
//     async function fetchStudentDetails() {
//       try {
//         const res = await fetch(
//           `http://localhost:8080/classRoster_backend/api/getStudentById.php?id=${studentId}`
//         );

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         setStudent(data);
//       } catch (error) {
//         setError("学生情報の取得に失敗しました");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchStudentDetails();
//   }, [studentId]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!student) {
//     return <p>学生情報が見つかりません。</p>;
//   }

//   return (
//     <>
//       <h1>学生情報</h1>
//       <p>出席番号：{student.id}</p>
//       <p>名前：{student.name}</p>
//     </>
//   );
// };

// export default StudentDetails;

// // "use client";

// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/router";

// // const StudentDetails = () => {
// //   const router = useRouter();
// //   const { studentId } = router.query;

// //   const [student, setStudent] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string>("");

// //   useEffect(() => {
// //     if (!studentId) return;

// //     async function fetchStudentDetails() {
// //       try {
// //         const res = await fetch(
// //           `http://localhost:8080/classRoster_backend/api/getStudentById.php?id=${studentId}`
// //         );

// //         if (!res.ok) {
// //           throw new Error(`HTTP error! Status: ${res.status}`);
// //         }

// //         const data = await res.json();
// //         setStudent(data);
// //       } catch (error) {
// //         setError("学生情報の取得に失敗しました");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchStudentDetails();
// //   }, [studentId]);

// //   if (loading) {
// //     return <p>Loading...</p>;
// //   }

// //   if (error) {
// //     return <p>{error}</p>;
// //   }

// //   if (!student) {
// //     return <p>学生情報が見つかりません。</p>;
// //   }

// //   return (
// //     <>
// //       <h1>学生情報</h1>
// //       <p>出席番号：{student.id}</p>
// //       <p>名前：{student.name}</p>
// //       <p>学籍番号：{student.studentNumber}</p>
// //       <p>役職：{student.position}</p>
// //     </>
// //   );
// // };

// // export default StudentDetails;

import React from "react";

// サーバーサイドで学生情報を取得する
async function fetchStudent(studentId: string) {
  const res = await fetch(
    `http://localhost:8080/classRoster_backend/api/getStudentById.php?id=${studentId}`
  );

  if (!res.ok) {
    throw new Error(`接続失敗: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

// ページコンポーネント
export default async function StudentDetails({
  params,
}: {
  params: { studentId: string };
}) {
  const studentId = params.studentId;

  // 学生情報を取得
  const student = await fetchStudent(studentId);

  if (!student || student.error) {
    return <p>学生情報が見つかりません。</p>;
  }

  return (
    <>
      <h1>学生情報</h1>
      <p>出席番号：{student.id}</p>
      <p>名前：{student.name}</p>
      <p>学籍番号：{student.studentNumber}</p>
      <p>役職：{student.position}</p>
    </>
  );
}
