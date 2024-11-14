"use client";

import React from "react";
import Link from "next/link";

type Student = {
  id: number;
  name: string;
  position: string;
};

type Props = {
  students: Student[];
};

const ClassRoster: React.FC<Props> = ({ students }) => {
  return (
    <>
      {students.map((student) => (
        <div key={student.id}>
          <h3>{student.id}</h3>
          <h3>{student.name}</h3>
          <p>Position: {student.position}</p>
          <Link href={`/students/${student.id}`}>more</Link>
        </div>
      ))}
    </>
  );
};

export default ClassRoster;
