"use client";

// import React, { useReducer } from "react";
// import Link from "next/link";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const StudentDetails = () => {
  const router = useRouter();
  const { studentId } = router.query; //urlからstudentIdを取得

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <>
      <h1>学生情報</h1>
      <p>出席番号：{studentId}</p>
    </>
  );
};

export default StudentDetails;
