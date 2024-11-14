//GETでクラス名簿の一覧取得
"use client";

import { NextResponse } from "next/server";
import { PHP_BASE_URL } from "../config";

export async function GET() {
  try {
    // PHPのエンドポイントにリクエストする
    const res = await fetch(`${PHP_BASE_URL}/getStudents.php`);
    const students = await res.json();
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}
