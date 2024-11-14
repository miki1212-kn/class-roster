"use client";

import React, { useEffect, useState } from "react";
import ClassRoster from "./components/ClassRoster";
// import Link from "next/link";
// import styles from "./page.module.css";

const ClassRosterPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("/api/students")
      .then((response) => response.json())
      .then((data) => setStudents(data));
  }, []);

  return (
    <>
      <h1>クラス名簿</h1>
      <ClassRoster students={students} />
    </>
  );
};

export default ClassRosterPage;
