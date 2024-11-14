"use client";

import React, { useReducer } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const StudentDetails = () => {
  const router = useRouter();
  const { studentId } = router.query;

  return (
    <>
      <h1>学生情報</h1>
      <p>出席番号：{studentId}</p>
    </>
  );
};
