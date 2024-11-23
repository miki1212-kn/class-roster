"use client";

import React from "react";
import Link from "next/link";

type Student = {
  id: number;
  name: string;
  studentNumber: number;
  position: string;
};

type Props = {
  students: Student[];
};

const ClassRoster: React.FC<Props> = ({ students }) => {
  return (
    <>
      {/* {students.map((student) => (
        <div key={student.id}>
          <h3>{student.id}</h3>
          <h3>{student.name}</h3>
          <p>学籍番号: {student.studentNumber}</p>
          <p>Position: {student.position}</p>
          <Link href={`/students/${student.id}`}>more</Link>
        </div>
      ))} */}
      <h2>名前:</h2>
      <p>学籍番号:</p>
      <p>Position:</p>
    </>
  );
};

export default ClassRoster;
