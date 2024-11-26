// import { GetServerSideProps, GetServerSideProps } from "next";

// const StudentDetail = ({ student }: { student: any }) => {
//   if (!student) {
//     return <p>学生情報がありません</p>;
//   }

//   return (
//     <>
//       <h1>学生情報</h1>
//       <p>出席番号：{student.id}</p>
//       <p>名前：{student.name}</p>
//     </>
//   );
// };

// //サーバーサイド側でデータをフェッチ
// export const GetServerSideProps: GetServerSideProps = async (context) => {
//   const { studentId } = context.params!;

//   // APIから学生情報を取得
//   const res = await fetch(
//     `http://localhost:8080/classRoster_backend/api/getStudentById.php?id=${studentId}`
//   );

//   const student = await res.json();

//   if (!student || student.error) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {
//       student,
//     },
//   };
// };

// export default StudentDetail;

//は？
