// "use client";

// import React from "react";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// export default function ClassList() {
//   const [classList, setClassList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchClassList() {
//       try {
//         const res = await fetch("/api/classlist");
//         const data = await res.json();
//         console.log(data);

//         // setClassList(data);
//         // setLoading(false);
//       } catch (error) {
//         console.error("エラー：接続できません", error);
//         setLoading(false);
//       }
//     }
//     fetchClassList();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <ul>
//         {/* {classList.map((item, index) => (
//           <li key={index}>
//             <h3>{item.id}</h3>
//             <h3>{item.name}</h3>
//             <p>学籍番号: {item.studentNumber}</p>
//             <p>Position: {item.position}</p>
//           </li>
//         ))} */}
//       </ul>
//     </>
//   );
// }

// // type Student = {
// //   id: number;
// //   name: string;
// //   studentNumber: number;
// //   position: string;
// // };

// // type Props = {
// //   students: Student[];
// // };

// // const ClassRoster: React.FC<Props> = ({ students }) => {
// //   return (
// //     <>
// //       {/* {students.map((student) => (
// //         <div key={student.id}>
// //           <h3>{student.id}</h3>
// //           <h3>{student.name}</h3>
// //           <p>学籍番号: {student.studentNumber}</p>
// //           <p>Position: {student.position}</p>
// //           <Link href={`/students/${student.id}`}>more</Link>
// //         </div>
// //       ))} */}
// //       <h2>名前:</h2>
// //       <p>学籍番号:</p>
// //       <p>Position:</p>
// //     </>
// //   );
// // };

// // export default ClassRoster;
