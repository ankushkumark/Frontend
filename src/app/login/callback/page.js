// "use client";
// import { useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function GoogleCallback() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const token = searchParams.get("token");
//     const name = searchParams.get("name");
//     const email = searchParams.get("email");

//     if (token) {
//       // ✅ Token localStorage me save karo
//       localStorage.setItem("token", token);
//       localStorage.setItem("name", name);
//       localStorage.setItem("email", email);

//       // ✅ Abhi seedhe Home (/)
//       router.replace("/");
//     }
//   }, [searchParams, router]);

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <p>Logging you in...</p>
//     </div>
//   );
// }
