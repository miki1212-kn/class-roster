//GETでクラス名簿の一覧取得
//api/classlistというエンドポイントを作成

import { NextResponse } from "next/server";

export async function GET() {
  try {
    // バックエンドのデータベースAPIからデータを取得
    const res = await fetch(
      "http://localhost:8080/classRoster_backend/api/classlist/index.php"
    );
    //レスポンスが正常じゃなかったらエラーを
    if (!res.ok) {
      throw new Error(`HTTPのエラー:${res.status}`);
    }
    const classList = await res.json();

    return NextResponse.json(classList, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "接続失敗", error: error.message },
      { status: 500 }
    );
  }
}

// import { PHP_BASE_URL } from "../config";

// export async function GET() {
//   try {
//     // PHPのエンドポイントにリクエストする
//     const res = await fetch(`${PHP_BASE_URL}/getStudents.php`);
//     const students = await res.json();
//     return NextResponse.json(students);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch students" },
//       { status: 500 }
//     );
//   }
// }
